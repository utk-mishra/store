
const purchaseData = [
  {
    name: 'Coffee',
    date: 'Tuesday, January 21',
    price: 'Rs 200',
    color: 'medium-spring-bud',
    icon: 'coffee',
  },
  {
    name: 'Burger',
    date: 'Friday, January 17',
    price: 'Rs 50',
    color: 'infra-red',
    icon: 'fast-food',
  },
  {
    name: 'Sandwich',
    date: 'Monday, January 6',
    price: 'Rs 70',
    color: 'burlywood',
    icon: 'sandwich',
  },
    {name:'veg thali',
     date:'Thursday, March 18',
     price:'Rs 40',
     color: 'burlywood',
     icon: 'dinner',
        
    },
    {name:'paratha',
     date:'Friday, March 19',
     price:'Rs 40',
     color: 'burlywood',
     icon: 'bread',
        
    },
];
const purchases = document.querySelector('.history-page__purchases');
const searchInputBox = document.querySelector('.search__input-box');

function createIcon(icon) {
  const purchaseIcon = document.createElement('span');

  switch (icon) {
    case 'coffee':
      purchaseIcon.className = 'iconify purchase__icon purchase__icon--coffee';
      purchaseIcon.setAttribute('data-inline', 'false');
      purchaseIcon.setAttribute('data-icon', 'bx:bx-coffee');
      break;
    case 'fast-food':
      purchaseIcon.className =
        'iconify purchase__icon purchase__icon--fast-food';
      purchaseIcon.setAttribute('data-inline', 'false');
      purchaseIcon.setAttribute('data-icon', 'ion:fast-food-outline');
      break;
    case 'sandwich':
      purchaseIcon.className = 'iconify purchase__icon purchase__icon--sandwich';
      purchaseIcon.setAttribute('data-inline', 'false');
      purchaseIcon.setAttribute('data-icon', 'noto:sandwich');
      break;
      
      case 'dinner':
     
      purchaseIcon.className = 'iconify purchase__icon purchase__icon--dinner';
      purchaseIcon.setAttribute('data-inline', 'false');
      purchaseIcon.setAttribute('data-icon', 'cil:dinner');
      break;
      case 'bread':
     
      purchaseIcon.className = 'iconify purchase__icon purchase__icon--flatbread';
      purchaseIcon.setAttribute('data-inline', 'false');
      purchaseIcon.setAttribute('data-icon', 'twemoji:flatbread');
      break;
          
    default:
  }

  return purchaseIcon;
}

function createPurchaseIconBackground(icon) {
  const purchaseIconBackground = document.createElement('div');
  purchaseIconBackground.className = 'purchase__icon-background';

  const purchaseIcon = createIcon(icon);

  purchaseIconBackground.appendChild(purchaseIcon);
  return purchaseIconBackground;
}

function createPurchaseInfo(name, date) {
  const purchaseInfo = document.createElement('div');
  purchaseInfo.className = 'purchase__info';

  const purchaseTitle = document.createElement('p');
  purchaseTitle.className = 'purchase__title';
  purchaseTitle.innerHTML = name;

  const purchaseDate = document.createElement('p');
  purchaseDate.className = 'purchase__date';
  purchaseDate.innerHTML = date;

  const purchaseDetailsBtn = document.createElement('button');
//  purchaseDetailsBtn.className = 'purchase__details-btn';
//  purchaseDetailsBtn.innerHTML = 'Details';

  purchaseInfo.appendChild(purchaseTitle);
  purchaseInfo.appendChild(purchaseDate);
//  purchaseInfo.appendChild(purchaseDetailsBtn);
  return purchaseInfo;
}

function createPurchasePrice(price) {
  const purchasePrice = document.createElement('p');
  purchasePrice.className = 'purchase__price';
  purchasePrice.innerHTML = price;
  return purchasePrice;
}

function hasPurchasesListChanged(purchasesArr) {
  const purchaseNameList = purchasesArr
    .map((purchase) => purchase.name)
    .join('');
  const currentPurchaseTitleDivs = document.querySelectorAll(
    '.purchase__title',
  );
  const currentPurchaseTitles = [];
  for (let i = 0; i < currentPurchaseTitleDivs.length; i++) {
    currentPurchaseTitles.push(currentPurchaseTitleDivs[i].innerText);
  }
  return currentPurchaseTitles.join('') !== purchaseNameList;
}

function createHistoryPagePurchases(purchasesArr) {
  purchases.innerHTML = '';
  for (let i = 0; i < purchasesArr.length; i++) {
    const { name, date, price, icon } = purchasesArr[i];
    const purchase = document.createElement('div');
    purchase.className = 'purchase';

    const purchaseIconBackground = createPurchaseIconBackground(icon);

    const purchaseInfo = createPurchaseInfo(name, date);

    const purchasePrice = createPurchasePrice(price);

    purchase.appendChild(purchaseIconBackground);
    purchase.appendChild(purchaseInfo);
    purchase.appendChild(purchasePrice);

    purchases.appendChild(purchase);
  }
}

function createSearchResults(e) {
  const searchInput = e.target.value.toLowerCase().replace(/\s/g, '');
  // switch to a filter
  const searchResults = purchaseData.filter((purchase) => {
    const purchaseName = purchase.name
      .toLowerCase()
      .replace(/\s/g, '')
      .slice(0, searchInput.length);
    return searchInput === purchaseName;
  });
  if (searchInput === '') {
    createHistoryPagePurchases(purchaseData);
  } else if (hasPurchasesListChanged(searchResults)) {
    createHistoryPagePurchases(searchResults);
  }
}

createHistoryPagePurchases(purchaseData);

searchInputBox.addEventListener('keyup', createSearchResults);
