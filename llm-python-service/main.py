from transformers import pipeline
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()

class LLMService:
    def __init__(self):
        self.models = {
            "llama2": self.load_model("meta-llama/Llama-2-7b-hf"),
            "mistral": self.load_model("bigscience/bloom-560m")
        }
        self.current_model = None
        self.conversation_history = []

    def load_model(self, model_name):
        return pipeline('text-generation', model=model_name, use_auth_token=os.getenv('HUGGINGFACE_API_TOKEN'))

    def select_model(self, model_name):
        if model_name in self.models:
            self.current_model = self.models[model_name]

    def query_model(self, question):
        if self.current_model:
            response = self.current_model(question)
            self.conversation_history.append((question, response))
            return response
        return "No model selected"

service = LLMService()

app = Flask(__name__)

@app.route('/select_model', methods=['POST'])
def select_model():
    modelName = request.json.get('modelName')
    service.select_model(modelName)
    return jsonify({"message": f"Model {modelName} selected."})

@app.route('/query', methods=['POST'])
def query():
    question = request.json.get('question')
    response = service.query_model(question)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
