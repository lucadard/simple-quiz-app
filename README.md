Quiz app is going to use open trivia api:

query example:
'https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple'

where:  difficulty can be 'easy', 'medium' or 'hard'
        type can be 'multiple' or 'boolean'
        category goes from 9 to 32
if any of those is not specified it chooses one randomly

categories = [
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musical & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations'
]

UI:
UI inspiration:
    https://www.uidesigndaily.com/posts/sketch-questionnaire-choice-submit-day-924
    &
    https://www.uidesigndaily.com/posts/photoshop-questionnaire-choice-submit-day-397

Game modes:

normal mode: 10 questions of random categories raising difficulty.
choose mode: 10 questions and the user got to choose between 3 random categories raising difficulty.
infinite: user selects difficulty and the system gives random questions everytime.
hardcore mode: only hard questions of random categories and the user can fail only one time.

Advanced features:

