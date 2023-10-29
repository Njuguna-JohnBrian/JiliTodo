/**
 *
 * @param {*} req request body object
 * @param {*} res response body object
 * @returns true if healthy, false if errored
 */
const checkHealth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Jilitodo api is healthy",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { checkHealth };
