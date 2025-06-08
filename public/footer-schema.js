// Esquema JSON-LD para SEO
document.addEventListener('DOMContentLoaded', function() {
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Vanessa Make Studio",
    "image": "https://vanessamakestudio.com.br/imgs/logo.webp",
    "url": "https://vanessamakestudio.com.br",
    "telephone": "+5545999362367",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Werner Zielasko, 2261",
      "addressLocality": "Toledo",
      "addressRegion": "PR",
      "postalCode": "85903-752",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -24.702445,
      "longitude": -53.775365
    },
    // "openingHoursSpecification": [
    //   {
    //     "@type": "OpeningHoursSpecification",
    //     "dayOfWeek": [
    //       "Monday",
    //       "Tuesday",
    //       "Wednesday",
    //       "Thursday",
    //       "Friday"
    //     ],
    //     "opens": "09:00",
    //     "closes": "19:00"
    //   },
    //   {
    //     "@type": "OpeningHoursSpecification",
    //     "dayOfWeek": "Saturday",
    //     "opens": "09:00",
    //     "closes": "17:00"
    //   }
    // ],
    "sameAs": [
      "https://www.instagram.com/vanessag.makestudio",
      "https://www.facebook.com/share/19W1rHYg5F"
    ],
    "priceRange": "$$"
  };
  
  schemaScript.text = JSON.stringify(schemaData);
  document.body.appendChild(schemaScript);
});
