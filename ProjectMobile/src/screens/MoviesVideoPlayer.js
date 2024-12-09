import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Video from 'react-native-video'
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import Orientation from 'react-native-orientation-locker'
import LottieView from 'lottie-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Slider from '@react-native-community/slider'
import Octicons from 'react-native-vector-icons/Octicons'
import AudioSubsModal from '../components/AudioSubsModal'
import VerticalSlider from 'rn-vertical-slider-matyno'
import React, { useEffect, useRef } from 'react'

export default function MoviesVideoPlayer({ route }) {

    const { movieID, movieLink, movieTitle } = route.params;
    const navigation = useNavigation();
    const [videoPressed, setVideoPressed] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isMute, setIsMute] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [isBuffering, setIsBuffering] = React.useState(true);
    const [resizeMode, setResizeMode] = React.useState("cover");
    const [audioSubsModalVisible, setAudioSubsModalVisible] = React.useState(false);
    const [volume, setVolume] = React.useState(1);
    const [brightness, setBrightness] = React.useState(0.5);
    const [watchTime, setWatchTime] = React.useState(0);

    const ref = useRef();

    React.useEffect(() => {
        Orientation.lockToLandscape();
        SystemNavigationBar.fullScreen(true);
    }, []);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const fetchWatchedTime = async () => {
    //             try {
    //                 const response = await getWatchTime(movieID)
    //                 console.log('Movie watchtime', response)
    //                 setWatchTime(response.watchedTime)
    //             } catch (error) {
    //                 console.log('Error fetching show watched time', error)
    //             }
    //         }
    //         fetchWatchedTime()
    //     }, [movieID])
    // )

    const handleVideoPress = () => {
        setVideoPressed(!videoPressed)
        console.log('Video pressed', videoPressed)
    }

    const moveBackward = () => {
        ref.current.seek(parseInt(progress.currentTime - 10));
    }

    const pauseVideo = () => {
        setIsPaused(true);
    }

    const playVideo = () => {
        setIsPaused(false);
    }

    const moveForward = () => {
        ref.current.seek(parseInt(progress.currentTime + 10));
    }

    const handleMute = () => {
        setIsMute(true);
    }

    const handleVolumeUp = () => {
        setIsMute(false);
    }

    const handleZoomIn = () => {
        setResizeMode("none");
    }

    const handleZoomOut = () => {
        setResizeMode("cover");
    }

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        const formattedHours = hours > 0 ? `${hours}:` : '';
        const formattedMinutes = `${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:`;
        const formattedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

        return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    };

    const showSubtitle = () => {
        pauseVideo();
        setAudioSubsModalVisible(true);
    }

    // const handleUpdateWatchTime = async (watchedTime, movieID) => {
    //     if (!isNaN(watchedTime)) {
    //         const response = await updateWatchtime(watchedTime, movieID)
    //     }
    // }

    const goBack = () => {
        // handleUpdateWatchTime(parseInt(progress.currentTime), movieID)
        navigation.goBack();
        Orientation.lockToPortrait();
        SystemNavigationBar.fullScreen(false);
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <AudioSubsModal visible={audioSubsModalVisible} onApply={() => { setAudioSubsModalVisible(false); playVideo() }}
                onCancel={() => { setAudioSubsModalVisible(false); playVideo() }} />
            <View style={styles.videoWrapper}>
                <TouchableOpacity style={styles.backgroundVideo}>
                    <Video
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        paused={isPaused}
                        muted={isMute}
                        style={styles.video}
                        resizeMode={resizeMode}
                        onLoad={(videoInfo) => {
                            console.log('Video info', videoInfo);
                            if (watchTime > 0) {
                                ref.current.seek(watchTime)
                            }
                        }}
                        onBuffer={(bufferValue) => {
                            //console.log("Video Buffering", bufferValue);
                            setIsBuffering(bufferValue.isBuffering);
                        }}
                        ref={ref}
                        onProgress={prog => {
                            //console.log('Progress', prog)
                            setProgress(prog)
                        }}
                    />
                    <TouchableOpacity onPress={() => handleVideoPress()} style={[styles.videoscreenContainer,
                    { backgroundColor: videoPressed ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }]}>
                        {
                            !videoPressed ? (
                                <View>

                                </View>
                            ) : (
                                <View style={styles.controlsContainer}>
                                    <TouchableOpacity style={styles.iconButton} onPress={() => moveBackward()}>
                                        <MaterialIcons name="replay-10" size={40} color="white" />
                                    </TouchableOpacity>
                                    {
                                        isPaused ? (
                                            <TouchableOpacity style={styles.iconButton} onPress={() => playVideo()}>
                                                <FontAwesome6 name="play" size={50} color="white" />
                                            </TouchableOpacity>
                                        ) : (
                                            < TouchableOpacity style={styles.iconButton} onPress={() => pauseVideo()}>
                                                <FontAwesome6 name="pause" size={50} color="white" />
                                            </TouchableOpacity>
                                        )
                                    }
                                    <TouchableOpacity style={styles.iconButton} onPress={() => moveForward()}>
                                        <MaterialIcons name="forward-10" size={40} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )
                        }

                        <View style={[styles.backButtonContainer, { opacity: videoPressed ? 1 : 0 }]}>
                            <TouchableOpacity onPress={() => goBack()}>
                                <MaterialIcons name="arrow-back" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.movieTitleText}>{movieTitle}</Text>
                        </View>

                        <View style={{
                            width: '15%',
                            height: '40%',
                            flexDirection: 'column',
                            gap: 10,
                            position: 'absolute',
                            bottom: 120,
                            left: 0,
                            paddingLeft: 60,
                            paddingRight: 0,
                            alignItems: 'center',
                            opacity: videoPressed ? 1 : 0,
                        }}>
                            <MaterialIcons name="brightness-7" size={30} color="white" />
                            <VerticalSlider value={0}
                                disabled={false}
                                width={20}
                                height={100}
                                min={0.1}
                                max={1}
                                step={0.1}
                                borderRadius={2}
                                minimumTrackTintColor={"tomato"}
                                maximumTrackTintColor={"gray"} />
                        </View>
                        <View style={{
                            width: '15%',
                            height: '40%',
                            flexDirection: 'column',
                            gap: 10,
                            position: 'absolute',
                            bottom: 120,
                            right: 0,
                            paddingLeft: 60,
                            paddingRight: 0,
                            alignItems: 'center',
                            opacity: videoPressed ? 1 : 0,
                        }}>
                            <MaterialIcons name="volume-up" size={30} color="white" />
                            <VerticalSlider value={0}
                                disabled={false}
                                width={20}
                                height={100}
                                min={0.1}
                                max={1}
                                step={0.1}
                                borderRadius={2}
                                minimumTrackTintColor={"tomato"}
                                maximumTrackTintColor={"gray"} />
                        </View>

                        <View style={[styles.sliderContainer, { opacity: videoPressed ? 1 : 0 }]}>
                            <Text style={styles.sliderText}>{formatDuration(progress.currentTime)}</Text>
                            <Slider
                                style={styles.sliderProgressBar}
                                minimumValue={0}
                                maximumValue={progress.seekableDuration}
                                minimumTrackTintColor='red'
                                maximumTrackTintColor='white'
                                thumbTintColor='red'
                                onValueChange={(prog) => {
                                    ref.current.seek(prog);
                                }}
                                value={progress.currentTime}
                            />
                            <Text style={styles.sliderText}>{formatDuration(progress.seekableDuration)}</Text>
                        </View>

                        <View style={[styles.audioSubsIconContainer, { opacity: videoPressed ? 1 : 0 }]}>
                            {isMute ? (
                                <TouchableOpacity onPress={() => handleVolumeUp()}>
                                    <Octicons name="mute" size={30} color="white" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => handleMute()}>
                                    <Octicons name="unmute" size={30} color="white" />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }} onPress={showSubtitle}>
                                <MaterialIcons name="subtitles" size={30} color="white" />
                                <Text style={styles.audioSubText}>Audio & Subtitles</Text>
                            </TouchableOpacity>

                            {
                                resizeMode === "cover" ? (
                                    <TouchableOpacity onPress={() => handleZoomIn()}>
                                        <MaterialIcons name="zoom-in-map" size={30} color="white" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleZoomOut()}>
                                        <MaterialIcons name="zoom-out-map" size={30} color="white" />
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backgroundVideo: {

    },
    videoWrapper: {
        width: '100%',
        //height: 300, // Set a fixed height for the video section
        justifyContent: 'flex-start',

    },
    video: {
        width: '100%',
        height: '100%',
    },
    videoscreenContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlsContainer: {
        position: 'absolute', // Overlay on the screen
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: [{ translateX: -100 }, { translateY: -50 }], // Offset by half the width and height
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Space between icons
        alignItems: 'center', // Center icons vertically
        width: 200, // Set a fixed width for proper spacing
    },
    iconButton: {
        padding: 10, // Add touchable area for better usability
    },
    sliderContainer: {
        // backgroundColor: 'blue',
        width: '90%',
        height: '25%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    sliderProgressBar: {
        flex: 1,
        color: 'red',
        bottom: 40
    },
    sliderText: {
        color: 'white',
        bottom: 40
    },
    audioSubsIconContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    audioSubText: {
        color: 'white',
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        marginLeft: 8
    },
    backButtonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    goBackIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    movieTitleText: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
    }
});