/** ОБРАБОТЧИКИ **/

// 18+

// document.querySelector('.buttonYes').addEventListener('click', () => {
//    document.querySelector('.wrapper__modal').style.display = 'none';
// })

// document.querySelector('.buttonNo').addEventListener('click', () => {
//    document.querySelector('.modalText').style.display = 'none';
// })

// document.querySelector('.buttonNo').addEventListener('click', () => {
//    document.querySelector('.modalDanger').style.display = 'block';
// })

// adultCheckbox.onchange = () => {
//    const button = document.body.getElementsByClassName('buttonYes')[0];

//    button.disabled = !button.disabled;
// };

// РЕГИСТРАЦИЯ

document.querySelector('.buttonReg').addEventListener('click', () => {
   document.querySelector('.reg__wrapper').style.display = 'flex';
});

document.querySelector('.regForm').addEventListener('submit', (event) => {
   event.preventDefault();

   const data = new FormData(event.target);

   register(
      data.get('login'),
      data.get('password'),
      data.get('password_confirmation')
   );
});

document.querySelector('.buttonClose').addEventListener('click', () => {
   document.querySelector('.reg__wrapper').style.display = 'none';
});

// АВТОРИЗАЦИЯ

document.querySelector('.buttonLogin').addEventListener('click', () => {
   document.querySelector('.authorization__wrapper').style.display = 'flex';
});

document.querySelector('.authorizationForm').addEventListener('submit', (event) => {
   event.preventDefault();

   const data = new FormData(event.target);

   authorize(
      data.get('login'),
      data.get('password')
   );
});

document.querySelector('.authorizationClose').addEventListener('click', () => {
   document.querySelector('.authorization__wrapper').style.display = 'none';
});

// ВЫХОД

document.querySelector('.buttonExit').addEventListener('click', () => {
   logout();
});

// ПРЯТАТЬ ОШИБКИ ВАЛИДАЦИИ

document.querySelectorAll('.authorizationForm input, .regForm input').forEach((input) => {
   input.addEventListener('input', () => {
      hideValidationErrors();
   });
});

document.querySelectorAll('.buttonClear').forEach((button) => {
   button.addEventListener('click', () => {
      hideValidationErrors();
   });
});

// КОРЗИНА

document.getElementById('userName').addEventListener('click', () => {
   document.querySelector('.shoppingCart__wrapper').style.visibility = 'visible';
});

document.getElementById('basket').addEventListener('click', () => {
   document.querySelector('.shoppingCart__wrapper').style.visibility = 'visible';
});

document.querySelector('.shoppingCartCloseLink').addEventListener('click', () => {
   document.querySelector('.shoppingCart__wrapper').style.visibility = 'hidden';
});

// БУРГЕР

const burger = document.querySelector('.menuBurger');

function nemuBurgerClick() {
   burger.classList.toggle('menuToggle');
}

/** ФУНКЦИИ */

const getCookie = (name) => {
   let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name, value, options = {}) => {
   options = {
      path: '/',
      ...options
   };

   if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
   }

   let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

   for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
         updatedCookie += "=" + optionValue;
      }
   }

   document.cookie = updatedCookie;
};

const deleteCookie = (name) => {
   setCookie(name, "", {
      'max-age': -1
   })
};

const register = (login, password, confirmation) => {
   let users = getCookie('users');

   users = undefined === users
      ? []
      : JSON.parse(users);

   let hasErrors = false;

   for (const user of users) {
      if (user.login === login) {
         document.querySelector('.loginUniqueError').style.visibility = 'visible';

         hasErrors = true;
      }
   }

   if (password.length < 8) {
      document.querySelector('.passwordLengthError').style.visibility = 'visible';

      hasErrors = true;
   }

   if (password !== confirmation) {
      document.querySelector('.passwordConformationError').style.visibility = 'visible';

      hasErrors = true;
   }

   if (hasErrors) {
      return;
   }

   users.push({
      login:    login,
      password: password,
   });

   setCookie('users', JSON.stringify(users));

   authorize(login, password, true);

   document.location.reload();
};

const authorize = (login, password, force = false) => {
   if (force) {
      setCookie('user', login);

      return;
   }

   let users = getCookie('users');

   users = undefined === users
      ? []
      : JSON.parse(users);

   let existingUser = null;

   for (const user of users) {
      if (user.login === login) {
         existingUser = user;

         break;
      }
   }

   if (null === existingUser) {
      document.querySelector('.userNotFoundError').style.visibility = 'visible';

      return;
   }

   if (existingUser.password !== password) {
      document.querySelector('.invalidPasswordError').style.visibility = 'visible';

      return;
   }

   setCookie('user', login);

   document.location.reload();
};

const logout = () => {
   deleteCookie('user');
   
   document.location.reload();
};

const hideValidationErrors = () => {
   document.querySelectorAll('.validation_error').forEach((errorText) => {
      errorText.style.visibility = 'hidden';
   });
};

const showSlides = (n) => {
   const slides = document.getElementsByClassName('item');
   const dots   = document.getElementsByClassName('slider-dots_item');

   if (n > slides.length) {
      slideIndex = 1;
   }

   if (n < 1) {
      slideIndex = slides.length;
   }

   for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
   }

   for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
   }

   slides[slideIndex - 1].style.display = 'flex';
   dots[slideIndex - 1].className      += ' active';
};

const plusSlide = () => {
   showSlides(slideIndex += 1);
};

const minusSlide = () => {
   showSlides(slideIndex -= 1);
};

const currentSlide = (n) => {
   showSlides(slideIndex = n);
};

const bottles = [
   {
      "id": 1,
      "name": "Wild Turkey Bourbon",
      "category":"Original",
      "img": "wildturkey81.png",
      "taste": "Гладкий. Сладкий. Полнотелый.",
      "scent": "Яркая ваниль.",
      "after": "Дуб и сухофрукты.",
      "additional": "81 proof",
      "price": 29
   },
   {
      "id": 2,
      "name": "Wild Turkey 101",
      "category": "Original",
      "img": "wildturkey101.png",
      "taste": "Сладкий. Округлый. Мягкий.",
      "scent": "Ваниль.",
      "after": "Специи. Апельсиновая цедра.",
      "additional": "101 proof. Выдержка 6-8 лет.",
      "price": 33
   },
   {
      "id": 3,
      "name": "Wild Turkey Rye",
      "category": "Original",
      "img": "wildturkeyrey81.png",
      "taste": "Ваниль. Специи.",
      "scent": "Пряный цитрус.",
      "after": "Длинное. Плавное. Чистое.",
      "additional": "81 proof.",
      "price": 26
   },
   {
      "id": 4,
      "name": "Wild Turkey Rye 101",
      "category": "Original",
      "img": "wildturkeyrey101.png",
      "taste": "Теплый. Дымный.",
      "scent": "Карамель. Мёд.",
      "after": "Глубокое. Пряное.",
      "additional": "Выдержка более 4 лет.",
      "price": 39
   },
   {
      "id": 5,
      "name": "Kentucky Spirit",
      "category": "SmallBatch",
      "img": "kentuckySpirit.png",
      "taste": "Ваниль. Миндаль. Мёд.",
      "scent": "Соблазнительный и сложный.",
      "after": "Долгое и мягкое.",
      "additional": "101 proof. Выдержка 8 лет.",
      "price": 60
   },
   {
      "id": 6,
      "name": "Rare Breed",
      "category": "SmallBatch",
      "img": "rare-breed.png",
      "taste": "Нотки дыма. Специи.",
      "scent": "Ваниль. Мёд. Карамель.",
      "after": "Долгое. Плавное.",
      "additional": "112.8 proof.",
      "price": 54
   },
   {
      "id": 7,
      "name": "Rare Breed Rye",
      "category": "SmallBatch",
      "img": "rare-breed-rye.png",
      "taste": "Фрукты. Карамель.",
      "scent": "Карамелизированное яблоко.",
      "after": "Пряные сухофрукты.",
      "additional": "Бочковая крепость 112.2 proof.",
      "price": 66
   },
   {
      "id": 8,
      "name": "Master's Keep One",
      "category": "MastersKeep",
      "img": "masters-keep-one-box-and-bottle.png",
      "taste": "Маслянистый. Карамель.",
      "scent": "Карамель. Медово-ванильный.",
      "after": "Обожженный дуб.",
      "additional": "101 proof.",
      "price": 399
   },
   {
      "id": 9,
      "name": "Master's Keep 17",
      "category": "MastersKeep",
      "img": "masterskeep-17-whiskey.png",
      "taste": "Дымный ирис.",
      "scent": "Дым. Табак.",
      "after": "Пикантная пряность и дуб.",
      "additional": "86.8 proof. Выдержка 17 лет",
      "price": 185
   },
   {
      "id": 10,
      "name": "Masters Keep Decades",
      "category": "MastersKeep",
      "img": "masterskeep-decades-whiskey.png",
      "taste": "Сухофрукты. Ирис.",
      "scent": "Карамель и дуб.",
      "after": "Мягкое. Сладкое. Пряное.",
      "additional": "104 proof. Выдержка 10-20 лет.",
      "price": 154
   },
   {
      "id": 11,
      "name": "Master's Keep Bond",
      "category": "MastersKeep",
      "img": "masterskeep-bottled-in-bond-whiskey.png",
      "taste": "Яркая Ваниль.",
      "scent": "Дуб и яблоко.",
      "after": "Дым и специи.",
      "additional": "100 proof. 17-летний.",
      "price": 191
   },
   {
      "id": 12,
      "name": "Cornstone Rye",
      "category": "MastersKeep",
      "img": "masterskeep-cornestone-whiskey.png",
      "taste": "Мёд и яблоко.",
      "scent": "Ванильный.",
      "after": "Свежее и чистое.",
      "additional": "109 proof. Выдержка 9-11 лет.",
      "price": 190
   },
   {
      "id": 13,
      "name": "Masters Keep Revival",
      "category": "MastersKeep",
      "img": "masterskeep-revival-whiskey.png",
      "taste": "Сладкий. Пряный.",
      "scent": "Вишня. Цитрус. Дуб.",
      "after": "Медовое с нотками специй.",
      "additional": "Выдержка 20 лет.",
      "price": 159
   },
   {
      "id": 14,
      "name": "American Honey",
      "category": "Flavored",
      "img": "American-Honey.png",
      "taste": "Яркий. Плавный.",
      "scent": "Натуральный мёд.",
      "after": "Богатое. Медовое.",
      "additional": "71 proof.",
      "price": 29
   },
   {
      "id": 15,
      "name": "American Honey Sting",
      "category": "Flavored",
      "img": "american-honey-sting.png",
      "taste": "Натуральный мёд.",
      "scent": "Сладкий и пряный.",
      "after": "Жгучее.",
      "additional": "71 proof.",
      "price": 27
   }
];

const showStock = () => {
   let bottlesWrapper;

   for (const bottle of bottles) {
      const div = document.createElement('div');

      bottlesWrapper = document.querySelector(`.ourProducts${bottle.category}`);

      div.innerHTML = `
         <div class="ourProductsItem">
            <div class="ourProductsItemLeft">
               <div class="ourProductsImage">
                  <img src="./img/bottles/${bottle.img}" alt="${bottle.name}" title="${bottle.name}">
               </div>
               <div class="ourProductsDiscription">
                  <div>${bottle.name}</div>
               </div>
            </div>
            <div class="ourProductsItemRight">
               <div class="taste">
                  <div class="itemRightTitle">ВКУС</div>
                  <div>${bottle.taste}</div>
               </div>
               <div class="aroma">
                  <div class="itemRightTitle">АРОМАТ</div>
                  <div>${bottle.scent}</div>
               </div>
               <div class="finish">
                  <div class="itemRightTitle">ПОСЛЕВКУСИЕ</div>
                  <div>${bottle.after}</div>
               </div>
               <div class="details">
                  <div class="itemRightTitle">ДОПОЛНИТЕЛЬНО</div>
                  <div>${bottle.additional}</div>
               </div>
               <a href="javascript:void(0);">
                  <button class="addToCartButton" data-id="${bottle.id}">Купить</button>
               </a>
            </div>
         </div>
      `;

      bottlesWrapper.append(div);
   }

   document.querySelectorAll('.addToCartButton').forEach((addToCartButton) => {
      addToCartButton.addEventListener('click', (event) => {
         const bottleId = event.target.getAttribute('data-id');

         addToCart(bottleId);
      });
   });
};

const showCart = () => {
   document.getElementById('userName').innerHTML = '';
   document.getElementById('userName').appendChild(document.createTextNode(userLogin));
   document.getElementById('basket').style.display = 'none';

   let cart = getCookie(`cart.${userLogin}`);

   if (undefined !== cart) {
      cart = JSON.parse(cart);

      const cartWrapper = document.querySelector('.shoppingCartBody');
      cartWrapper.innerHTML = '';

      let totalPrice   = 0;
      let bottlesCount = 0;

      for (const bottle of bottles) {
         if (!Object.keys(cart).includes(bottle.id.toString())) {
            continue;
         }

         const divCart = document.createElement('div');

         divCart.classList.add('cartElement');
         divCart.innerHTML = `
            <div class="cartImg">
               <img src="./img/bottles/${bottle.img}" alt="${bottle.name}">
            </div>
            <div class="cartText">
               <div class="cartName">${bottle.name}</div>
               <div class="cartContent">
                  <div class="cartPrice">${bottle.price}$</div>
                  <input class="cartInput" type="number" data-id="${bottle.id}" value="${cart[bottle.id]}" min="1" max="100" step="1"/>
               </div>
            </div>
            <div class="cartResult">${bottle.price * cart[bottle.id]}$</div>
            <div class="cartClose">
               <a data-id="${bottle.id}" class="cartCloseLink" href="#">
                  <img src="./icons/close.png" alt="">
               </a>
            </div>
         `;

         cartWrapper.append(divCart);

         totalPrice   += bottle.price * parseInt(cart[bottle.id]);
         bottlesCount += parseInt(cart[bottle.id]);
      }

      document.querySelector('.cartFinalResult').innerHTML = '';
      document.querySelector('.cartFinalResult').appendChild(document.createTextNode(`${totalPrice}$`));

      if (bottlesCount > 0) {
         document.getElementById('basket').style.display = 'flex';
         document.getElementById('basket').innerHTML = '';
         document.getElementById('basket').appendChild(document.createTextNode(bottlesCount.toString()));
      }

      document.querySelectorAll('.cartInput').forEach((input) => {
         input.addEventListener('input', (event) => {
            const bottleId = input.getAttribute('data-id');

            setCountInCart(bottleId, input.value);
         });
      });

      document.querySelectorAll('.cartCloseLink').forEach((closeLink) => {
         closeLink.addEventListener('click', (event) => {
            const bottleId = event.target.parentElement.getAttribute('data-id');

            removeFromCart(bottleId);

            event.target
               .closest('.cartElement')
               .remove();
         });
      });
   }
};

const addToCart = (bottleId) => {
   let cart = getCookie(`cart.${userLogin}`);

   cart = undefined === cart
      ? {}
      : JSON.parse(cart);

   if (!cart[bottleId]) {
      cart[bottleId] = 1;
   } else {
      cart[bottleId]++;
   }

   setCookie(`cart.${userLogin}`, JSON.stringify(cart));

   showCart();
};

const setCountInCart = (bottleId, count) => {
   let cart = JSON.parse(getCookie(`cart.${userLogin}`));

   cart[bottleId] = count;

   setCookie(`cart.${userLogin}`, JSON.stringify(cart));

   showCart();
}

const removeFromCart = (bottleId) => {
   let cart = JSON.parse(getCookie(`cart.${userLogin}`));

   delete cart[bottleId];

   setCookie(`cart.${userLogin}`, JSON.stringify(cart));

   showCart();
};

/** ДЕЙСТВИЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ */

let slideIndex = 1;

showSlides(slideIndex);
showStock();

const userLogin = getCookie('user');

document.querySelector('.buttonReg').style.display   = userLogin === undefined ? 'flex' : 'none';
document.querySelector('.buttonLogin').style.display = userLogin === undefined ? 'flex' : 'none';
document.querySelector('.buttonExit').style.display  = userLogin === undefined ? 'none' : 'flex';
document.getElementById('basket').style.display     = userLogin === undefined ? 'none' : 'flex';

if (userLogin !== undefined) {
   showCart();
}

