export async function getUserLocation() {
  if(!navigator.geolocation) return
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(coords => resolve(showPosition(coords)), logError);
  })
}

function showPosition(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    return {
      lat: latitude,
      long: longitude
    }
}

function logError(error: any) {
  console.log(error)
  return null
}