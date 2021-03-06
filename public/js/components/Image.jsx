import React from 'react';
const Card = require('material-ui/lib/card/card');
const Avatar = require('material-ui/lib/avatar');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const Table = require('material-ui/lib/table/table');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableBody = require('material-ui/lib/table/table-body');
import Colors from 'material-ui/lib/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Image extends React.Component {
  getVirtualSize(){
    return (this.props.image.VirtualSize / 1024 / 1024).toFixed(2) + " MB"
  }

  getCreationTime(){
    let a = new Date(this.props.image.Created * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours().toString().length == 1 ? "0" + a.getHours() : a.getHours()
    let min = a.getMinutes().toString().length == 1 ? "0" + a.getMinutes() : a.getMinutes();
    let sec = a.getSeconds().toString().length == 1 ? "0" + a.getSeconds() : a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  getImageRepoTag(){
    if(this.props.image.RepoTags.length > 0){
      let tag = this.props.image.RepoTags[0];
      tag = tag.substring(0, tag.indexOf(':'));
      return tag
    }
  }

  render(){
    let image = this.props.image;
    let rows = [];

    for (var key in image) {
      if (image.hasOwnProperty(key)) {
        //Non empty info
        if (image[key] != '' && image[key] != null) {
          if(key == 'Created'){
            rows.push(
              <TableRow key={image.Id + key + "_row"}>
                <TableRowColumn>Created</TableRowColumn>
                <TableRowColumn>
                  {this.getCreationTime()}
                </TableRowColumn>
              </TableRow>
            );
          } else if (key == 'VirtualSize'){
            rows.push(
              <TableRow key={image.Id + key + "_row"}>
                <TableRowColumn>VirtualSize</TableRowColumn>
                <TableRowColumn>
                  {this.getVirtualSize()}
                </TableRowColumn>
              </TableRow>
            );
          } else if (key == 'Labels'){
            for (var key in image['Labels']) {
              if (image['Labels'].hasOwnProperty(key)) {
                rows.push(
                  <TableRow key={image.Id + key + "_row"}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>
                      {image['Labels'][key]}
                    </TableRowColumn>
                  </TableRow>
                );
              }
            }
          } else {
            rows.push(
              <TableRow key={image.Id + key + "_row"}>
                <TableRowColumn>{key}</TableRowColumn>
                <TableRowColumn>
                  {image[key]}
                </TableRowColumn>
              </TableRow>
            );
          }
        }
      }
    }
    return(
        <Card style={this.props.style} initiallyExpanded={false}>
          <CardHeader
            title={this.getImageRepoTag()}
            subtitle={this.getVirtualSize()}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={<Avatar src="img/docker.png"></Avatar>}
            style={{fontSize:"50px", margin:"0 0 20px 0"}}
            />

            <Table
              height='300px'
              fixedHeader={true}
              fixedFooter={true}
              expandable={true}
              selectable={false}>
              <TableHeader enableSelectAll={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                >

                {rows}

              </TableBody>
            </Table>
        </Card>
    );
  }
}

export default Image;
