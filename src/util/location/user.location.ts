let userPosition = null

export async function getUserLocation() {
    if(!navigator.geolocation) return
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(coords => resolve(showPosition(coords)), logError);
    })
}

function getUserCoordinates() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          }
        );
      }
    });
  }
  

function showPosition(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    return {
      lat: latitude,
      long: longitude
    }
}

function logError(error) {
  console.log(error)
  return null
}