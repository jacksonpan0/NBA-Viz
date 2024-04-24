const GenerateSeasonOptions = (startYear, endYear) => {
    const options = [{ value: "NONE", label: " " }];
    for (let year = endYear; year >= startYear; year--) {
      options.push({ value: year.toString(), label: year.toString() });
    }
    return options;
}

export default GenerateSeasonOptions;