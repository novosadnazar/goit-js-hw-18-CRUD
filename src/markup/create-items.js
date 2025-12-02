
export const createItemsMarkup = (array) => {
  const items = array
    .map(({ id, calories, description, image, price, title }) => {
      return `<li class="item" id="${id}">
    <span class="item-span">${id}</span>
    <img src="${image}" alt="${title}" class="image">
<h2 class="title">${title}</h2>
<p class="calories">Калорії: ${calories}</p>
<p class="description">Опис: ${description}</p>
<p class="price">Ціна: ${price} грн</p>
<button type="button" data-action="Delete">Видалити</button>
<button type="button" data-action="Edit">Редагувати</button>
</li>`;
    })
    .join("");
  return items;
};
