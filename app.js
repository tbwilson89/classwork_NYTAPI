var apiKey = "RDoNGXhrWgxw0TAJ5Tp226FXTf00eRiQ"	

$('#search-btn').on('click', function(){
    event.preventDefault()
    var term = $('#search-term').val()
    var records = $('#num-records').val()
    var yearStart = $('#start-year').val()
    var yearEnd = $('#end-year').val()

    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${apiKey}`

    if(yearStart !== ''){
        queryURL += `&begin_date=${yearStart}0101`
    }
    if(yearEnd !== ''){
        queryURL += `&end_date=${yearEnd}1231`
    }
    $.ajax({url: queryURL, method: "GET"}).then(function(res){
        console.log(res)
        var docs = res.response.docs
        for(i=0;i<records;i++){
            console.log(docs[i])
            var headline = docs[i].headline.main
            var snippet = docs[i].snippet

            $('#article-div').append(`
                <br>
                <div class="card" style="width: 100%;">
                    <div class="card-header" id="headline">${headline}s</div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="snippet">${snippet}</li>
                    </ul>
                </div>
            `)
        }
    })
})

$('#clear-btn').on('click', function(){
    $('#article-div').empty()
})