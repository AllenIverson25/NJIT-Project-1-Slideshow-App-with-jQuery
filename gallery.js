let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // JSON file URL
const mWaitTime = 5000 // Timer interval in milliseconds
let mTimer = null // Variable to hold the timer reference

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Start the timer for the slideshow
  startTimer()

  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $('.moreIndicator').click(function() {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').click(showNextPhoto)

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').click(showPrevPhoto)

  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // Parse the JSON and push each image object into mImages array
      data.images.forEach(function(image) {
        mImages.push(image)
      })
      // After JSON is loaded, call swapPhoto() to display the first image
      swapPhoto()
    },
    error: function(xhr, status, error) {
      console.error('Error loading JSON:', error)
    }
  })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath)
  $('.location').text('Location: ' + mImages[mCurrentIndex].imgLocation)
  $('.description').text('Description: ' + mImages[mCurrentIndex].description)
  $('.date').text('Date: ' + mImages[mCurrentIndex].date)
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
  // Reset the timer when manually advancing
  resetTimer()
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  mCurrentIndex--
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
  // Reset the timer when manually going back
  resetTimer()
}

// Timer function to automatically advance slideshow
function startTimer () {
  // Clear any existing timer to ensure only one runs at a time
  if (mTimer !== null) {
    clearInterval(mTimer)
  }
  // Create a timer to automatically call showNextPhoto() every mWaitTime milliseconds
  mTimer = setInterval(function() {
    showNextPhoto()
  }, mWaitTime)
}

// Helper function to reset the timer
function resetTimer () {
  startTimer()
}