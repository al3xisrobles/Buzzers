import faiss
import pandas as pd
import numpy as np

class VectorDB:
    def __init__(self, dimension, use_gpu=False):
        self.dimension = dimension
        self.index = self.create_index(use_gpu)

    def create_index(self, use_gpu):
        """ Create a FAISS index for storing vectors. """

        # Using L2 distance for similarity
        index = faiss.IndexFlatL2(self.dimension)

        if use_gpu:
            # GPU acceleration by using a single GPU
            gpu_resource = faiss.StandardGpuResources()
            index = faiss.index_cpu_to_gpu(gpu_resource, 0, index)

        return index

    def add_vectors(self, vectors):
        """ Add vectors to the index. Vectors should be a 2D numpy array. """

        # Make sure the vector is a float32
        if vectors.dtype != np.float32:
            vectors = vectors.astype(np.float32)

        # Add vector to index
        self.index.add(vectors)

    def search_vectors(self, query_vector, k):
        """ Search the index for the top k most similar vectors. """

        # Define the query vector
        query_vector = np.array(query_vector, dtype=np.float32).reshape(1, -1)

        # Search the db, getting the distances and corresponding indices
        distances, indices = self.index.search(query_vector, k)
        return distances, indices

def load_embeddings_from_csv(filepath, col_name):
    """ Load embeddings from a CSV file. """

    # Read CSV
    df = pd.read_csv(filepath)

    # For each embedding in the brand
    embeddings = np.stack(df[col_name].apply(lambda x: np.fromstring(x[1:-1], sep=', ')))
    return embeddings
