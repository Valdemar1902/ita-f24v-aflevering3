// Load the JSON data from the 'albums.json' file
d3.json("albums.json").then((data) => {
    // Create a Set from the genres in the data to get unique genres
    const genreSet = new Set(data.map((item) => item.genre));
    // Convert the Set back to an Array
    const genres = Array.from(genreSet);
  
    // Select the dropdown list with id 'genre-select'
    const select = d3.select("#genre-select");
    // Bind the genres data to the 'option' elements of the dropdown list
    select
      .selectAll("option")
      .data(genres)
      .enter() // Create new 'option' elements for each item in the data that doesn't already have an associated 'option' element
      .append("option") // Append the new 'option' elements to the dropdown list
      .text((d) => d); // Set the text of each 'option' element to be the genre
  
    // Set the text of each 'div' element to be the album name and artist name
    select.on("change", function () {
      const selectedGenre = d3.select(this).property("value");
      const filteredAlbums = data.filter((item) => item.genre === selectedGenre);
      const list = d3.select("#albums-list");
      
      list.selectAll("tr").remove();
    
      const rows = list
        .selectAll("tr")
        .data(filteredAlbums)
        .enter()
        .append("tr");
    
      rows.append("td").text((d) => d.albumName);
      rows.append("td").text((d) => d.artistName);
      rows.append("td").text((d) => d.productionYear);
      d3.select("#toggle-albums-button").on("click", function() {
        // Toggle the visibility of the rows that match the selected genre
        list.selectAll("tr").style("display", function(d) {
          return (d.genre === selectedGenre && d3.select(this).style("display") === "none") ? "" : "none";
        });
      });
     
      });
    });
