import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
//import { toggleSong, togglePlayPause } from './actions/queue'
import ShareBox from './ShareBox'
import  playButton  from './images/playbutton.svg'
import  pauseButton  from './images/pauseButton.png'



class Song extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleDescription = this.toggleDescription.bind(this)

        this.state = {
            expanded: false
        }
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
    }

    onPressPlay(song) {
        this.updateStorePlayPause(song.id !== this.props.activeSong.id)
        this.props.actions.toggleSong(song)
    }

    updateStorePlayPause(newSong) {
        this.props.actions.togglePlayPause((newSong) ? true : !this.props.isPlaying)
    }

    toggleDescription() {
        const { height } = this.state

        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderTags() {
        const {
            song,
        } = this.props

        const tags = song._embedded['wp:term'][1].map(tag =>
            <span key={tag.name} className="tag">#{tag.name}</span>)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }

    // componentDidMount() {
    //   this.isElementOverflowing()
    // }

    renderTop() {
        const {
            song,
            activeSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === activeSong.id && isPlaying ? (
            <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />

        ) : (
          <svg className="playButton" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>
        )


        return (

            <div className="topContentContainer" >
              <div className="postInfoContainer" >
                <div className="singlePostPlayer hideMobile">
                    <button
                        className="singlePostPlayerButton"
                        onClick={() => this.onPressPlay(song)}
                    >
                        {playPauseButton}
                    </button>

                </div>

                <div className="marquee songInfo mobile" onClick={ () => this.onPressPlay(song)}>
                    <Link className="postTitleLink" to={`/songs/${song.id}`}><span className="songName">{song.acf.song_name}</span></Link><br />
                      <span className="artistName">{song.acf.artist_name}</span>
                </div>
                <div className="marquee songInfo desktop">
                  <div id="checkOverFlowSong" className="marquee-inner songtitle">
                  <Link className="songName postTitleLink" to={`/songs/${song.id}`}>{song.acf.song_name}</Link>
                  </div>
                    <br />
                  <div id="checkOverFlowArtist" className="marquee-inner artist">
                    <span className="artistName">{song.acf.artist_name}</span>
                  </div>
                </div>

                <p className="metaInfo">
                    <p className="leftInfo desktop">
                    <span className="postDate "><Moment format="ll" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span>
                    </p>
                    <p className="leftInfo mobile">
                    <span className="postDate "><Moment format="d/M/YY" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span>
                    </p>
                    {this.renderTags(song)}
                    <ShareBox song={song} />
                    <a target="_blank" href={song.acf.spotify_link}  className="spotify"><i className="fa fa-spotify" aria-hidden="true" /></a>


                </p>
              </div>
              <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
                  <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
              </div>
            </div>
        )
    }

    // renderDescription() {
    //     const { song } = this.props
    //     return (
    //           <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
    //               <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
    //           </div>
    //     )
    // }

    // isElementOverflowing() {
    //     const songInfo = document.getElementById("checkOverFlowSong");
    //     const songName = document.getElementById("checkOverFlowArtist");
    //
    //             if (songInfo.offsetWidth < songName.scrollWidth) {
    //         return console.log('OVERFLOW')
    //       }
    //
    // }

    render() {
        const {
            song,
            activeSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === activeSong.id && isPlaying ? (
            <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />
        ) : (
            <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" className="playButton" />
        )

        const { height } = this.state

        return (
            <div id={song.slug} className="songContainer clearfix" key={`${song.id}`}>
            <div className="wrapper"  >
                <div className="postContent" >

                    <div className="imageContainer" onClick={ () => this.onPressPlay(song)}>

                            <img className="songImage" src={song.better_featured_image && song.better_featured_image.source_url} />
                            <div className="songImageInfoContainer grid">
                              <button
                                  className="singlePostPlayerButton"
                                  onClick={() => this.onPressPlay(song)}
                              >
                                  {playPauseButton}
                              </button>
                              <div className="song-info">
                                  <p className="song-title">{song.acf.song_name}</p>
                                  <p className="song-artist">{song.acf.artist_name}</p>
                              </div>
                            </div>
                    </div>
                    {this.renderTop()}
                </div>
            </div>
            <Link className="goToSongPage" to={`/songs/${song.id}`}>
              <i className="im im-angle-right"></i>
            </Link>
            <Link className="seeMore" to={`/songs/${song.id}`}>
              <span>...see more</span>
                <i className="im im-angle-right"></i>
            </Link>
            <hr />


            </div>
        )
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired,
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    activeSong: PropTypes.object,
}

Song.defaultProps = {
    activeSong: {},
}

const mapStateToProps = (state, ownProps) => {
    const {
        isPlaying,
        activeSong,
    } = state

    return {
        isPlaying,
        activeSong,
    }
}


/*const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(this.props.actions.toggleSong(postId)),
    togglePlayPause: (playPause) => dispatch(this.props.actions.togglePlayPause(playPause)),
})*/

export default connect(
    mapStateToProps,
    null
)(Song)
