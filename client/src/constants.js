let parameterList = ['coins', 'invites', 'createdAt'];
let parameterOrder = ['desc', 'desc', 'asc'];
let network = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/';

export default {
  parameterList,
  parameterOrder,
  network
}
