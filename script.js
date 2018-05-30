const app = {};

app.destinations = [
    {
        name: 'the Brickworks <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.3174669069977!2d-79.36862068568914!3d43.68316297912026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cca5aaf70027%3A0x5d82f1b6b4974496!2sBrickworks+at+Don+Valley!5e0!3m2!1sen!2sca!4v1525569192644" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>',
        features: ['pond', 'coffee', 'family']
    },
    {
        name: 'Hanlan\'s Point beach <iframe src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.281744330049!2d-79.39783998569239!3d43.621494579122455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3540b1efeb1b%3A0x6c5ebb9c1f8d4f0a!2sHanlan&#39;s+Point+Beach!5e0!3m2!1sen!2sca!4v1525568914052" width = "100%" height = "250" frameborder = "0" style = "border:0" allowfullscreen ></iframe>',
        features: ['beach', 'water', 'freakFlag']
    },
    {
        name: 'Trinity Bellwoods park <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11548.34664900272!2d-79.41462123037292!3d43.6463652659413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34fb59eedcdb%3A0x3fb22c8aefb75bb!2sTrinity+Bellwoods+Park!5e0!3m2!1sen!2sca!4v1525569126838" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>',
        features: ['swimmingPool', 'beer', 'hipster']
    }
];

app.getFinalChoice = function (waterType, drinkType, crowdType) {
    // create an array called final choice that will store the features in the destinations array that the user's click event corresponds with 
    const finalChoice = [];
    // create a variable for each choice - called choice1, choice2, choice3 - that is equal to the destinations array and will filter that variable that we used to save the input choice we made - then push that variable to the finalChoice variable
    const choice1 = app.destinations
        .filter((destination) => {
            return destination.features.includes(waterType);
        });
    finalChoice.push(choice1);

    const choice2 = app.destinations
        .filter((destination) => {
            return destination.features.includes(drinkType);
        });
    finalChoice.push(choice2);

    const choice3 = app.destinations
        .filter((destination) => {
            return destination.features.includes(crowdType);
        });
    finalChoice.push(choice3);

    app.makeflat(finalChoice)
}

app.makeflat = function (finalChoice) {
    // flatten the objects in the final choice array 
    const flat = finalChoice.reduce((total, amount) => {
        return total.concat(amount);
    });
    // loop through flat array to count occurences of object using countBy underscore 
    app.count = _.countBy(flat, function (obj) {
        return obj.name.replace("", "")
    });
    const countNumber = Object.keys(app.count).length;

    app.getObjectWithHighestTally (countNumber)
}

app.getObjectWithHighestTally = function() {
    // create a function that returns the object with the highest occurences(count)
    app.countArray = Object.keys(app.count);
    const fundayDestination = _.max(app.countArray, function (highest) {
        return (app.count[highest]);
    });

    app.renderFinalDestination(fundayDestination)
}

app.randomNumber = function (number) {
    return Math.floor(Math.random() * number.length);
}

app.randomDestination = function (number) {
    const i = app.randomNumber(number);
    const destination = number[i];
    return destination;
}

app.renderFinalDestination = function (fundayDestination, randomDestination) {
    if (app.count > 1) {
        return $('.results').html(`<h1 class="choice">Check out ${fundayDestination}</h1>`);
    } else {
        return $('.results').html(`<h1 class="choice">Check out ${app.randomDestination(app.countArray)}</h1>`);
    }
}

app.events = function () {
    // when page loads, immediately hide the questions and results. when you click the input with the name of take quiz, show the questions section 
    $('#questions').hide();
    $('.copyright--logo').hide();
    $('#results').hide();

    $('.takeQuiz').on('click', function () {
        $('#header').hide();
        $(`.copyright--logo`).hide();
        $('#questions').fadeIn();
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        const waterType = $(`input[name=water]:checked`).val();
        const drinkType = $(`input[name=drink]:checked`).val();
        const crowdType = $(`input[name=crowd]:checked`).val();
        app.getFinalChoice(waterType, drinkType, crowdType);
    });

    $('.submit-button').on('click', function () {
        $('#questions').hide();
        $('#results').fadeIn();
        $(`.copyright--logo`).fadeIn();
    });
}
app.init = function () {
    app.events();
}

$(function () {
    app.init();
});