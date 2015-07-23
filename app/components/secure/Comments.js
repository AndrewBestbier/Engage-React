var React = require('react');



//Component
var Comments = React.createClass({

  render: function(){

    ulStyle = {
      padding: 0
    }

    textStyle = {
      marginLeft: 13
    }

    if(!(this.props.items === undefined))
    {
      //Converting the Object sent through by firebase to an array that can be mapped
      var array = $.map(this.props.items, function(value, index) {
          return [value];
      });

      var listItems = array.map(function(item, index){
        return (
          <li key={index} className="list-group-item">
            <span>
              {item.comment}
            </span>
          </li>
        )
      }.bind(this));
      return (
        <div>
          <ul style={ulStyle}> 
            {listItems}
          </ul>
        </div>
      )
    }
    else
    {
      return (
        <div>
          <span style={textStyle}>
            No one has commented yet. Be the first!
          </span>
        </div>
      )
    }

    
  }
});

module.exports = Comments;