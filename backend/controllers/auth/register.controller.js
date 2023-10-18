const register = (req, res) => {
  try {
    const {firstname, lastname} = req.body;
  } catch (error) {
    console.log(error);
  }
};
