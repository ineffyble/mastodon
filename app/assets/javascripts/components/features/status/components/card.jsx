import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import VideoPlayer from '../../../components/video_player';

const outerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  cursor: 'pointer',
  fontSize: '14px',
  border: '1px solid #363c4b',
  borderRadius: '4px',
  marginTop: '14px',
  overflow: 'hidden'
};

const linkStyle = {
  color: '#616b86',
  textDecoration: 'none',
}

const contentStyle = {
  flex: '1 1 100px',
  padding: '8px',
  paddingLeft: '14px',
  overflow: 'hidden'
};

const titleStyle = {
  display: 'block',
  fontWeight: '500',
  marginBottom: '5px',
  color: '#d9e1e8',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const descriptionStyle = {
  color: '#d9e1e8'
};

const imageOuterStyle = {
  flex: '0 0 100px',
  background: '#373b4a'
};

const videoOuterStyle = {
  flex: '0 0 100%',
};

const imageStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  margin: '0',
  borderRadius: '4px 0 0 4px'
};

const hostStyle = {
  display: 'block',
  marginTop: '5px',
  fontSize: '13px',
  color: '#616b86',
  textDecoration: 'none',
};

const frameStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  margin: '0',
  border: false
}

const getHostname = url => {
  const parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
};

const Card = React.createClass({
  propTypes: {
    card: ImmutablePropTypes.map
  },

  mixins: [PureRenderMixin],

  render () {
    const { card } = this.props;

    if (card === null) {
      return null;
    }

    let media = '';

    if (card.get('video')) {
      let videoContent = '';
      switch (card.get('video').get('type')) {
      case 'text/html':
        videoContent = <iframe src={card.get('video').get('url')} style={frameStyle} />;
        break;
      case 'video/mp4':
        let videoMedia = new Map();
        videoMedia.set('url', card.get('video').get('url'));
        videoContent = <VideoPlayer media={videoMedia} width='100%' />;
        break;
      case 'application/x-shockwave-flash':
        // This space intentionally left blank.
        break;
      }
      media = (
        <div style={videoOuterStyle}>
          {videoContent}
        </div>
      );
    } else if (card.get('image')) {
      media = (
        <div style={imageOuterStyle}>
          <a href={card.get('url')} >
            <img src={card.get('image')} alt={card.get('title')} style={imageStyle} />
          </a>
        </div>
      );
    }

    return (
      <div style={outerStyle} className='status-card'>
        {media}

        <div style={contentStyle} href={card.get('url')} >
          <a href={card.get('url')} style={linkStyle} >
            <strong style={titleStyle} title={card.get('title')}>{card.get('title')}</strong>
            <p style={descriptionStyle}>{card.get('description').substring(0, 50)}</p>
            <span style={hostStyle}>{getHostname(card.get('url'))}</span>
          </a>
        </div>
      </div>
    );
  }
});

export default Card;
