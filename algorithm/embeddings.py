from dotenv import load_dotenv
from openai import OpenAI
import os

# Load OpenAI API key
load_dotenv()
client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    try:
        response = client.embeddings.create(
            input=[text],
            model=model
        )

        return response.data[0].embedding
    except Exception as e:
        print(f"Failed to get embedding: {str(e)}")
        return None

def apply_embeddings(df, column_name):
    df[f'{column_name}_embedding'] = df[column_name].apply(
        lambda x: get_embedding(
            x,
            model='text-embedding-3-small'
        )
    )
    return df
