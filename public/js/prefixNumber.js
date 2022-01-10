console.log("Prefix Number working");

function prefixSelected() {
  let prefixSelected = document.getElementById("select-prefix");
  let valueOfPrefixSelected = prefixSelected.value;

  let phoneInput = (document.getElementById(
    "number"
  ).value = `+${valueOfPrefixSelected}9`);
}

const selectPrefix = document.getElementById("select-prefix");
selectPrefix.addEventListener("change", prefixSelected);
