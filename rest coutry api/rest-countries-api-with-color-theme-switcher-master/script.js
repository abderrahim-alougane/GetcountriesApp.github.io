// slecting elements
const CountryCards = document.querySelector(".CountryCards");

const dropdown = document.querySelector(".dropdown");

const input = document.querySelector("input");

const CountryRow = document.querySelector(".CountryRow");

const sc1 = document.querySelector(".sc1");

// api
const url = "https://restcountries.com/v3.1/all";

const RenderCoutries = function (Country) {
  const CountryCard = `
    <div class="col-xl-3 mb-5">

    <div class="card  border-0 shadow-lg"  data-Country="${Country.name.common}" >
        <img src="${Country.flags.svg}" class="card-img-top CountryFlag" alt="...">
        <div class="card-body h-100">
          <h5 class="card-title">${Country.name.common}</h5>

          <p class="card-text fw-bold">Population :   <span  class="fw-light" >${Country.population}</span>     </p>
          <p class="card-text fw-bold">Region :<span  class="fw-light" >${Country.region}</span>   </p>
          <p class="card-text fw-bold">Capital :<span  class="fw-light" >${Country.capital}</span>   </p>

        </div>
      </div>

</div>
      
    `;

  CountryRow.innerHTML += CountryCard;
};

const getborders = async (Country) => {
  const Fetchdata = await fetch(`https://restcountries.com/v2/name/${Country}`);
  const CnJson = await Fetchdata.json();

  const borders = CnJson[0].borders.reduce((acc, border) => {
    return (
      acc +
      `<a href="#" class="text-decoration-none text-dark bg-white shadow px-4 py-1">${border} </a> `
    );
  }, "");
  return borders;
};

const RenderAllCoutries = (Country) => {
  Country.forEach((country) => {
    RenderCoutries(country);
  });
};

const CountryInfo = (country) => {
  const Getla = country[0].languages.reduce((acc, lan) => {
    return acc + lan.name + ",";
  }, "");
  getborders(country[0].name).then((res) => {
    document.querySelector(".borders").innerHTML = res;
  });

  const Info = `
    <div class="col-xl-12">
    <a href="#" class="text-decoration-none bg-white px-5 text-dark fw-bold py-2 shadow text-center Back">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg> 
       Back  
    </a>
</div>
<div class="col-xl-6 mt-5">
    <img src="${country[0].flags.svg}" alt="" class="img-fluid">
</div>
<div class="col-xl-6 mt-5">
    <div class="row  align-items-center">
        <div class="col-xl-6">
            <p class="fw-bold fs-3">${country[0].name}</p>
            <p class="card-text fw-bold">Native Name :   <span  class="fw-light" >${country[0].nativeName}</span>     </p>
            <p class="card-text fw-bold">Population :   <span  class="fw-light" >${country[0].population}</span>     </p>
            <p class="card-text fw-bold">Region :   <span  class="fw-light" >${country[0].region}</span>     </p>
            <p class="card-text fw-bold">Sub Region :   <span  class="fw-light" >${country[0].subregion}</span>     </p>
            <p class="card-text fw-bold">Capital :   <span  class="fw-light" >${country[0].capital}</span>     </p>
        </div>
        <div class="col-xl-6">
            <p class="card-text fw-bold">Top Level Domaine :   <span  class="fw-light" >${country[0].topLevelDomain}</span>     </p>
            <p class="card-text fw-bold">Currencies :   <span  class="fw-light" >${country[0].currencies[0].code}</span>   </p>
            <p class="card-text fw-bold">Languages :   <span  class="fw-light" > ${Getla}</span>     </p>
        </div>
        <div class="col-xl-12 d-flex gap-3 mt-5">
            <p class="fw-bold"> Border Countries:</p>
            <div class="borders "> 
     
            </div>
        </div>
    </div>
</div>
      
    `;

  CountryRow.innerHTML += Info;
};

// fetching restcounties api

const FetchbyRegion = async function (Region) {
  try {
    CountryRow.innerHTML = "";

    const CountiesRegion = await fetch(
      `  https://restcountries.com/v3.1/region/${Region}`
    );

    const CoverteToJson = await CountiesRegion.json();
    RenderAllCoutries(CoverteToJson);
  } catch {}
};

const FetchingData = async function () {
  try {
    const AllCountries = await fetch(url);
    const CovertingToJson = await AllCountries.json();

    // RenderCoutries(CovertingToJson[0]);
    RenderAllCoutries(CovertingToJson);
  } catch {}
};

FetchingData();

//  display country information

const RenderCoutryInfo = async function (country) {
  const CoutryData = await fetch(
    `https://restcountries.com/v2/name/${country}`
  );
  const CovertingToJson = await CoutryData.json();
  //   console.log(CovertingToJson);
  CountryInfo(CovertingToJson);
};

// filtring data

// 1-by input

input.addEventListener("input", () => {
  const CountryTitle = document.querySelectorAll(".card-title");
  CountryTitle.forEach((country) => {
    if (country.textContent.toLowerCase().includes(input.value.toLowerCase())) {
      country.parentElement.parentElement.parentElement.classList.remove(
        "d-none"
      );
      return;
    }
    country.parentElement.parentElement.parentElement.classList.add("d-none");
  });
});

// filter by region uisng dropdown

dropdown.addEventListener("click", (e) => {
  const ClickedItem = e.target.closest(".dropdown-item");
  if (!ClickedItem) return;
  //   console.log(ClickedItem.textContent);
  FetchbyRegion(ClickedItem.textContent);
});

// display coutry info

CountryRow.addEventListener("click", (e) => {
  sc1.classList.add("d-none");
  const Country = e.target.closest(".card").dataset.country;
  if (!Country) return;
  //   console.log(Country);
  console.log(Country);
  CountryRow.innerHTML = " ";
  RenderCoutryInfo(Country);
});

CountryRow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".Back");
  if (!clicked) return;

  sc1.classList.remove("d-none");
  CountryRow.innerHTML = "";
  FetchingData();
});
