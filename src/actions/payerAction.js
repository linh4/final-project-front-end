const addPayer = (payer) => {
  return {type: 'ADD_PAYER', payload: payer}
}

const getPayer = (payers) => {
  return {type: 'GET_PAYER', payload: payers}
}

const removePayer = (payerId) => {
  return {type: 'DELETE_PAYER', payload: payerId}
}

let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

export const createPayer = (name) => {
  return dispatch => {
    return fetch("http://localhost:3000/payers", {
      method: 'POST',
      headers: head,
      body: JSON.stringify(name)
    })
    .then(res => res.json())
    .then(data => dispatch(addPayer(data)))
  }
}

export const fetchPayer = () => {
  return dispatch => {
    return fetch("http://localhost:3000/payers", {
      headers: head
    })
    .then(res => res.json())
    .then(data => dispatch(getPayer(data)))
  }
}

export const deletePayer = (payerId) => {
  return dispatch => {
    return fetch(`http://localhost:3000/payers/${payerId}`, {
      method: 'DELETE',
      headers: head
    })
    .then(res => res.text())
    .then(data => dispatch(removePayer(payerId)))
  }
}