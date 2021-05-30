import Pagination from 'react-bootstrap/Pagination';
import { connect } from 'react-redux';
import { paginateThunk } from '../../Redux/action';

const Paginations = ({total_task_count, paginate}) => {
  
  const pagination_items = [];
  for(let i = 0; i < Math.ceil(total_task_count/3); i++){
      pagination_items.push(
        <Pagination.Item key={i+1} onClick={() => paginate(i+1)} >
          {i+1}
        </Pagination.Item>
      )
  }

  return (
    <div style={{margin: '30px 0'}}>
      <Pagination>
        {pagination_items}
      </Pagination>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      total_task_count: state.toDoState.total_task_count
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    paginate: (page) => {
      dispatch((dispatch) => paginateThunk(dispatch, page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginations);