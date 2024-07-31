import apiReq from "./apiReq";

export async function handleGetCities() {
  try {
    const res = await apiReq("GET", "/api/cities");
    if (!res.ok) throw new Error("Cannot fetch cities");
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function handleGetCity(cityId) {
  try {
    const res = await apiReq("GET", `/api/cities/${cityId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function handleAddCity(newCity) {
  try {
    const res = await apiReq("POST", "/api/cities", newCity);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
export async function handleDeleteCity(cityId) {
  try {
    const res = await apiReq("DELETE", `/api/cities/${cityId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
