//* Hi. This function is so ugly I decided to hide it in a separate file.
//* Typescript has limits....
//* (i'm so sorry)

/* eslint-disable */
// @ts-ignore
export const handleCheckboxChange = (
  // @ts-ignore
  category,
  // @ts-ignore
  option,
  // @ts-ignore
  checked,
) => {
  if (checked) {
    // @ts-ignore
    category.setter((prev) => [...(prev ?? []), option.value]);
  } else {
    // @ts-ignore
    category.setter(
      // @ts-ignore
      (prev) => prev?.filter((item) => item !== option.value) ?? [],
    );
  }
};
