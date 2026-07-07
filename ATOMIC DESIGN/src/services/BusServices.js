export function filterBusesByRoute(busList, fromCity, toCity) {
  const selectedFromCity = fromCity.trim().toLowerCase();
  const selectedToCity = toCity.trim().toLowerCase();

  if (!selectedFromCity || !selectedToCity) {
    return [];
  }

  return busList.filter((bus) => {
    const busFromCity = bus.from.toLowerCase();
    const busToCity = bus.to.toLowerCase();

    return busFromCity === selectedFromCity && busToCity === selectedToCity;
  });
}
