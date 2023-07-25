const EXTERNAL_DATA_URL = "http://localhost:8000/api/main/sitemap";
const URL = "https://free4download.in";

function generateSiteMap(movies) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://free4download.in</loc>
    <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>

     </url>
     <url>
       <loc>https://free4download.in/tamil</loc>
              <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>

     </url>
     <url>
       <loc>https://free4download.in/telugu</loc>
              <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>

     </url>
     <url>
       <loc>https://free4download.in/hindi</loc>
              <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>

     </url>
     <url>
       <loc>https://free4download.in/malayalam</loc>
              <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority>
     </url>
    ${movies.sitemap
      .map((movie) => {
        // console.log(movie);
        return movie.movieS
          .map((m) => {
            return `<url><loc>${`${URL}/${movie._id.toLowerCase()}/${m.title
              .replaceAll(" ", "_")
              .replaceAll("&", "&amp;")
              .toLowerCase()}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`;
          })
          .join("");
      })
      .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const movies = await request.json();
  //   console.log(movies);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(movies);
  //   console.log(sitemap);
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
