from random_word import RandomWords

r = RandomWords()

def getRandomWords(number):
    random_words = [r.get_random_word() for _ in range(number)]  # Generate 5 random words
    return ' '.join(random_words)

print(getRandomWords(5))