import React from 'react';

import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss'

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'hats',
          imageUrl: 'https://react-crwn-clothing.s3.ap-northeast-2.amazonaws.com/main/hats.png',
          id: 1
        },
        {
          title: 'jackets',
          imageUrl: 'https://react-crwn-clothing.s3.ap-northeast-2.amazonaws.com/main/jackets.png',
          id: 2
        },
        {
          title: 'sneakers',
          imageUrl: 'https://react-crwn-clothing.s3.ap-northeast-2.amazonaws.com/main/sneakers.png',
          id: 3
        },
        {
          title: 'womens',
          imageUrl: 'https://react-crwn-clothing.s3.ap-northeast-2.amazonaws.com/main/womens.png',
          size: 'large',
          id: 4
        },
        {
          title: 'mens',
          imageUrl: 'https://react-crwn-clothing.s3.ap-northeast-2.amazonaws.com/main/men.png',
          size: 'large',
          id: 5
        }
      ]
    }
  }

  render() {
    return (
      <div className='directory-menu'>
        {
          this.state.sections.map(({title, imageUrl, id, size}) => (
            <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
          ))
        }
      </div>
    )
  }
}

export default Directory;
