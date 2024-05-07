import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Download necessary NLTK datasets
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def vector_preprocessing(vector: str):
    # Tokenize the input
    tokens = word_tokenize(vector)

    # Normalize: convert to lower case
    tokens = [token.lower() for token in tokens]

    # Remove stop words and punctuation
    stop_words = set(stopwords.words('english'))
    punctuation = set('!()-[]{};:\'",<>./?@#$%^&*_~')
    stop_words_and_punc = stop_words.union(punctuation)
    tokens = [token for token in tokens if token not in stop_words_and_punc]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    return ' '.join(tokens)


def get_brand_vectors(brands):
    brand_vectors = {}
    for brand in brands:
        # Brand name
        brand_name = brand.get('name', 'Unknown Brand')

        # Personality vibes
        personality_adjectives = ' '.join(brand.get('personality_adjectives', []))

        # Vibe adjectives
        vibe_adjectives = ' '.join(brand.get('vibe_adjectives', []))

        # Product category
        product_category = brand.get('product_category', '')

        # Target segment personality
        target_adjectives = ' '.join(brand.get('target_segment', {}).get('personality_adjectives', []))

        # Target segment event types
        event_types = ' '.join(brand.get('target_segment', {}).get('event_types', []))

        # Vector
        vector = f"{personality_adjectives} {vibe_adjectives} {product_category} {target_adjectives} {event_types}"

        # Preprocess
        vector = vector_preprocessing(vector)

        # Define the vector for each brand
        brand_vectors[brand_name] = vector

    return brand_vectors

def get_organizer_vectors(organizers):
    organizer_vectors = {}
    for organizer in organizers:
        # Name
        organizer_name = organizer.get('name', 'Unknown Organizer')

        # Create dictionary
        organizer_vectors[organizer_name] = {}

        # Org profile vibes
        organizer_adjectives = ' '.join(organizer.get('vibe_adjectives', []))

        # Iterate through each event
        for event in organizer.get('events', []):
            # Event title
            event_title = event.get('title', '')

            # Event
            event_description = event.get('description', '')

            # Category
            event_category = event.get('category', '')

            # Audience vibes
            event_audience = ' '.join(event.get('audience', []))

            # Suitable Products
            event_suitable_products = ' '.join( event.get('suitable_products', []))

            # Combine org profile vibes with event vibes
            concatenated_vector = f"{event_description} {event_category} {organizer_adjectives} {event_audience} {event_suitable_products}"

            # Preprocess
            concatenated_vector = vector_preprocessing(concatenated_vector)

            # Define the vector for each organizer event
            organizer_vectors[organizer_name][event_title] = concatenated_vector

    return organizer_vectors


def get_dataframes(data):
    # Brands' and organizers' data
    brands = data["brands"]
    organizers = data["organizers"]

    # Process brands for vector database
    brand_vectors = get_brand_vectors(brands)

    # Process organizers for vector database
    organizer_vectors = get_organizer_vectors(organizers)

    # Convert brand vectors to DataFrame
    brand_df = pd.DataFrame.from_dict(brand_vectors, orient='index', columns=['Brand'])

    # Convert organizer vectors to DataFrame
    org_list = []
    for org, events in organizer_vectors.items():
        for event_name, vector in events.items():
            org_list.append({'Org': org, 'Event': event_name, 'Vector': vector})
    org_df = pd.DataFrame(org_list).set_index('Event')

    return (brand_df, org_df)


if __name__ == "__main__":
    import json
    with open("mock_data.json") as f:
        data = json.load(f)

    get_dataframes(data)
