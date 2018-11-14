import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAllBills, deleteBill} from '../../actions/billAction'
import Modal from 'react-responsive-modal';

class BillPage extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    this.props.getAllBills()
  }

  renderPayers = (bill) => [].concat(...bill.payers)

  handleClick = (bill) => {
    if (this.renderPayers(bill).length === 0) {
      this.props.history.push(`/bills/${bill.id}`)
    } else {
      this.props.history.push(`/bills/${bill.id}/payers`)
    }
  }

  handleDelete = (id) => {
    this.props.deleteBill(id)
    this.onCloseModal()
  }

  onOpenModal = () => {
   this.setState({ open: true });
  }

  onCloseModal = () => {
   this.setState({ open: false });
  }

  modalBox = (bill) => {
    return (
      <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div className="asking-box">
          <p>Are you Sure about deleting it?</p>
          <button className="btn cancel" onClick={this.onCloseModal}>Cancel</button>
          <button className="btn yes" onClick={() => this.handleDelete(bill.id)} >Delete</button>
        </div>
      </Modal>
    )
  }

  render() {
    const {open} = this.state
    if (this.props.allBill.length === 0) {
      return <div>No bill yet....</div>
    }
    const filterBills = this.props.allBill.filter(bill => bill.user_id === this.props.currentUser.id)
    const billList = filterBills.sort((a,b) => b.id - a.id)
    return (
      <React.Fragment>
        <p className="bill-title">Bill from __</p>
        {billList.map(bill => (<div key={bill.id} className="row">
          {this.renderPayers(bill).length === 0 ? (
            <React.Fragment>
              <div className="bill-box" onClick={() => this.handleClick(bill)}>
                <p> __{bill.date} <span className="uncomplete">Uncompleted</span></p>
              </div>
              <div className="delete-btn" >
                <span onClick={this.onOpenModal}><i className="far fa-trash-alt icons"></i></span>
                {this.modalBox(bill)}
              </div>
            </React.Fragment>
            )
          : (
            <React.Fragment>
              <div className="bill-box" onClick={() => this.handleClick(bill)}>
                <p> __{bill.date}</p>
              </div>
              <div className="delete-btn" >
                <span onClick={this.onOpenModal}><i className="far fa-trash-alt icons"></i></span>
                {this.modalBox(bill)}
                {/* <Modal open={open} onClose={this.onCloseModal} center>
                  <div className="asking-box">
                    <p>Are you Sure about deleting it?</p>
                    <button className="btn cancel" onClick={this.onCloseModal}>Cancel</button>
                    <button className="btn yes" onClick={() => this.handleDelete(bill.id)} >Delete</button>
                  </div>
                </Modal> */}
              </div>
            </React.Fragment>)
          }
          <hr/>
        </div>))
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside homepage", state)
  return {
    currentUser: state.user.currentUser,
    allBill: state.text.allBill,
    name: state.text.name
    };
};

export default withRouter(connect(mapStateToProps, {getAllBills, deleteBill})(BillPage))
