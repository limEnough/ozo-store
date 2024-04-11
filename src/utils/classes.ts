interface ClassMapping {
  [key: string]: string;
}

const mapClasses = (mapping: ClassMapping, propValue: string) => {
  return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key === propValue]));
};

export { mapClasses };
