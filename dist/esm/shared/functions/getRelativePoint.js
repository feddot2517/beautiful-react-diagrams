/* beautiful-react-diagrams version: 0.5.0 */
var getRelativePoint = function getRelativePoint(point, relative) {
  return [point[0] - relative[0], point[1] - relative[1]];
};

export default getRelativePoint;
