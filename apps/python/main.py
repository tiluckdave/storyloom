from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from openai import OpenAI
import boto3
import os
import random, time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage

# Use a service account.
cred = credentials.Certificate('./key.json')

app = firebase_admin.initialize_app(
    cred, {'storageBucket': 'storyloom-f6009.appspot.com'})

db = firestore.client()
bucket = storage.bucket()

polly_client = boto3.Session(aws_access_key_id=os.getenv("ACCESS_ID"),
                             aws_secret_access_key=os.getenv("SECRET_KEY"),
                             region_name='ap-south-1').client('polly')

client = OpenAI(api_key=os.getenv("OPENAI_KEY"), organization=os.getenv("ORG"))
chatGPT_base = f"""
    We have an application which generates bedtime stories for children. We want our stories to be related to and of same style and length as Pantantra & Jataka stories from India. We want our stories to be following a specific story format.

    Story Format
    Title, Beginning - Exposition, Middle - Rising Part, Climbing Action and Main Part, End - Failing Action, Resolution, Learning from the story.

    do not add the format as paragraph titles. just add the title as Title: <title> and then the story.

    Our story must have all the following characteristics
    Character, Setting, Plot, Conflict & Theme

    We want to generate new stories which does make some sense but at the same time are very basic for a small kid to understand properly. we want to use very simple and easy to understand language. The sentences in the should be small and small paragraphs. we want the story to be generated based on a query and some parameters which are given below. The story should not tell the theme if the story instead it should say Moral of the story and a one line moral for the same. 

    Generate a small story with all the points mentioned above with just 3 - 4 paragraphs. keep the story ready to read for a small kid.

    Query - 
    """

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def index():
  return 'Hello world'


@app.route('/generate', methods=['POST'])
@cross_origin()
def generate():
  uid = request.json['userid']

  doc_ref = db.collection("users").document(uid)

  doc = doc_ref.get()
  if doc.exists:
    print(f"Document data: {doc.to_dict()}")
  else:
    print("No such document!")

  animals = doc.to_dict()['animals']
  behavior = doc.to_dict()['behaviours']
  age = doc.to_dict()['age']

  print(animals)
  print(behavior)
  print(age)

  query = f"My kid is {age} years old. These days his behaviours are {','.join(behavior)}. His favorite animals are {','.join(animals)}."

  prompt = chatGPT_base + query

  response = client.completions.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt,
      max_tokens=1000,
  )

  story = response.choices[0].text

  # remove extra new line characters
  story = story.replace('\n\n', '\n')
  # remove first and last new line characters
  story = story.strip('\n')
  # make story a list of sentences use \n and fulstops to get a list of all sentences
  story = story.split('\n')
  story = [s.split('. ') for s in story]
  # flatten the list
  story = [s for sublist in story for s in sublist]
  # remove empty sentences
  story = [s for s in story if s != '']

  title = story[0]
  title = title.replace('Title: ', '')

  # remove title from story
  story = story[1:]

  storytts = title + '. ' + '. '.join(story)
  storytts = storytts.replace('"', "'")
  print(storytts)

  response = polly_client.synthesize_speech(VoiceId='Kajal',
                                            OutputFormat='mp3',
                                            Text=storytts,
                                            Engine='neural')

  file = open('speech.mp3', 'wb')
  file.write(response['AudioStream'].read())
  file.close()

  blob = bucket.blob(title + '.mp3')
  blob.upload_from_filename('speech.mp3')
  blob.make_public()

  os.remove('./speech.mp3')

  # extract title from story
  data = {
      'userid': uid,
      'title': title,
      'story': story,
      'audio': blob.public_url
  }

  number = random.randint(80, 100)
  time.sleep(number)

  return jsonify(data)


app.run(host='0.0.0.0', port=81)
