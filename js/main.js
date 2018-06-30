document.getElementById('myForm').addEventListener('submit',addBookmark);

function addBookmark(e){
    e.preventDefault();
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    if(!validateForm(siteName,siteURL)){
        return false;
    }

    var bookmark ={
        siteName : siteName,
        siteURL: siteURL
    }

    
    if(localStorage.getItem('bookmarks')===null){
        var bookmarks =[];
        bookmarks.push(bookmark);
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();
    fetchBookmarks();
}


function fetchBookmarks(){
    var Output = document.getElementById('siteData');
    Output.innerHTML='';
    var addedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<=addedBookmarks.length;i++){

        var siteName = addedBookmarks[i].siteName;
        var siteURL = addedBookmarks[i].siteURL;
        Output.innerHTML += '<div class="jumbotron">'+
        '<h3>'+siteName+'</h3>'+
        '<a class="btn btn-primary btn-sm" target="-blank" href="'+ siteURL +'" >Visit Site </a>'+
        '<button class="btn btn-danger btn-sm" onClick="deleteBookmard(\'' +siteURL+ '\')">Delete</button>'
        '</div>';
    }
}

function deleteBookmard(URL){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for ( var i=0; i<=bookmarks.length; i++){
          if(bookmarks[i].siteURL==URL){
              bookmarks.splice(i,1);        
          }    
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(siteName,siteURL){

    if(!siteName || !siteURL){
        alert('please fill the form');
        return false;
    }

    var expression = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)){
       alert('please use valid url');
       return false;
    }
    return true;
}