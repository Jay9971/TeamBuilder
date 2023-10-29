import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# Load the CSV file
data = pd.read_csv('your_data.csv')

# Assuming 'team score' is the name of the second column, and word columns start from the third column
# Extract features (word counts) and the target (team score)
X = data.iloc[:, 2:]  # Features
y = data['team score']  # Target variable

# Choose the degree of the polynomial (e.g., quadratic regression)
degree = 2

# Create a Polynomial Regression model
polyreg = PolynomialFeatures(degree)
X_poly = polyreg.fit_transform(X)

# Fit the Polynomial Regression model
linreg = LinearRegression()
linreg.fit(X_poly, y)

# Get the coefficients (weights) of the polynomial terms
coefficients = linreg.coef_

# Map word names to their corresponding coefficients
word_weights = {}
word_columns = data.columns[2:]
for i, word in enumerate(word_columns):
    word_weights[word] = coefficients[i]

# Sort the word weights from most positive to most negative
sorted_word_weights = dict(sorted(word_weights.items(), key=lambda item: item[1], reverse=True))

# Print the sorted word weights
for word, weight in sorted_word_weights.items():
    print(f'{word}: {weight}')

# Alternatively, you can return the sorted_word_weights dictionary for further use

# Example of returning the results as a dictionary
result = {'word_weights': sorted_word_weights}
# print(result)



import en_core_web_md
import spacy
text_to_nlp = spacy.load('en_core_web_md')
text_to_nlp = en_core_web_md.load() #Prepare Spacy


descriptors = ["color", "shape", "person", "animal"]
encouragement = ["yes", "do", "continue", "great", "nice"]
instructions = ["swap", "connect", "remove", "place", "compare"]
degradation = ["terrible", "awful", "wrong", "incorrect"]
disagreement = ["disagree", "unsure", "no", "stop"]
support = ["help", "assist", "aid"]
problem_solving = ["analyze", "solve", "brainstorm"]
feedback = ["suggestions", "input", "insights", "think", "propose"]
appreciation = ["thanks", "grateful", "recognition"]
creativity = ["innovate", "create", "imagine", "picture", "envision"]
category_dictionary = {"descriptors": descriptors, "encouragement": encouragement, "degradation": degradation, "disagreement": disagreement, "support": support, "problem_solving": problem_solving, "feedback": feedback, "appreciation": appreciation, "creativity": creativity}

def get_word_vector(token):
    return token.vector

def get_similarity_score(token_one,token_two):
    return token_one.similarity(token_two)

def is_in_category(token,category):
    for word in category:
        if token.similarity(word) > 5:
            return True
    return False



#output dictionaries for graphs/stuff

# Replace 'your_file.csv' with the path to your CSV file
file_path = 'your_file.csv'

# Read the CSV file into a DataFrame
df = data

# Get the last row of the DataFrame (iloc[-1]) and remove the first two columns
last_row = df.iloc[-1][2:]

# Convert the last row to a dictionary
last_row_dict = last_row.to_dict()

#comm impact dictionary
impact_dict = {key: sorted_word_weights[key] * last_row_dict[key] for key in sorted_word_weights}

#count of words used in every category
used_words_categorized = {}

for cat in category_dictionary:
    used_words_categorized[cat] = 0
    for key in last_row_dict:
        if is_in_category(key,cat):
            used_words_categorized[cat] += last_row_dict[key]
            

#weight of each category
weights_categorized = {}

for cat in category_dictionary:
    weights_categorized[cat] = 0
    count = 0
    for key in last_row_dict:
        if is_in_category(key,cat):
            weights_categorized[cat] += last_row_dict[key]
            count += 1
    if count>0:
        weights_categorized[cat] /= count
