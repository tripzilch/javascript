javascript:(function(){var r=new XMLHttpRequest;r.open("GET","https://hn.algolia.com/api/v1/search?query="+encodeURIComponent(location.href),true);r.onreadystatechange=function(){if(r.readyState==4&&r.status==200){var e=JSON.parse(r.responseText);if(e.nbHits>0){location.href="https://news.ycombinator.com/item?id="+e.hits[0].objectID}else{alert("this url has not been submitted yet")}}};r.send()})()