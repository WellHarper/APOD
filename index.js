
var data = document.getElementById('date')
var button = document.getElementById('send')
var descriptionArea = document.getElementById('descriptionArea')
var description = document.getElementById("description")
var title = document.getElementById("title")
var main = document.getElementsByTagName('main')

data.value = toDay()


function toDay() {
    var date = new Date();
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return today = year + '-' + month + '-' + day;
}

console.log(toDay())

function trazerInformacao(date) {
    var request = new XMLHttpRequest()
    request.open('GET', `https://api.nasa.gov/planetary/apod?api_key=LzALv6a7AwcuJIDwdwaiNkNNKRQvyABAE80YWaD2&date=${date}`)
    request.onload = function() {
        var response  = JSON.parse(request.responseText)
        console.log(response)
        description.innerHTML = response.explanation
        title.innerHTML = response.copyright == undefined ? 'This day does not have a title' : response.copyright
        if(response.media_type === 'image') {
            var midia = document.getElementById("content")
            if(midia != undefined) {
                descriptionArea.removeChild(midia)
            }
            var img = document.createElement('img')
            img.src = response.url
            img.style.height = '500px'
            img.style.width = '50%'
            img.id = 'content'
            descriptionArea.appendChild(img)
        }
        else {
            var midia = document.getElementById("content")
            if(midia != undefined) {
                descriptionArea.removeChild(midia)
            }
            var video = document.createElement('iframe')
            video.src = response.url
            video.style.height = '500px'
            video.style.width = '50%'
            video.id = 'content'
            descriptionArea.appendChild(video)
        }
        
    
}

request.send()



}




trazerInformacao(toDay())



button.addEventListener('click', function() {
    if(date.value < '1995-06-16' || date.value > toDay()) {
        return alert('data inválida')
    }
    trazerInformacao(data.value)
    
})