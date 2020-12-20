import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faImdb, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Link from "Components/Link";
import MinPoster from "Components/MinPoster";
import Section from "Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  padding-bottom: 50px;
`;

const Cover = styled.div`
  height: 85vh;
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  padding: 20px;
  width: 60%;
  margin-left: 50px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Title = styled.h3`
  font-size: 42px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 28px;
  color: #d4d4d4;
  width: 90%;
  line-height: 1.5;
`;

const DataName = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  color: white;
  opacity: 0.8;
  font-weight: 800;
`;

const Seasons = styled.div`
  display: flex;
  flex-direction: row;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Getflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Getflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.imdb_id ? (
            <>
              <DataName>Links</DataName>
              <Link
                text={"IMDB Page"}
                icon={faImdb}
                url={`https://www.imdb.com/title/${result.imdb_id}`}
              ></Link>
            </>
          ) : null}
          {result.videos.results?.length > 0 ? (
            <>
              <DataName>Videos</DataName>
              {result.videos.results.map((video) => (
                <Link
                  text={video.name}
                  key={video.id}
                  icon={faYoutube}
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                />
              ))}
            </>
          ) : null}
          {result.production_companies?.length > 0 ? (
            <>
              <DataName>Production Companies</DataName>
              {result.production_companies.map((compnay, index) =>
                index === result.production_companies.length - 1 ? (
                  <span>{compnay.name}</span>
                ) : (
                  <span>{compnay.name} / </span>
                )
              )}
            </>
          ) : null}
          {result.production_countries?.length > 0 ? (
            <>
              <DataName>Production Countries</DataName>
              {result.production_countries.map((country, index) =>
                index === result.production_countries.length - 1 ? (
                  <span>{country.name}</span>
                ) : (
                  <span>{country.name} / </span>
                )
              )}
            </>
          ) : null}
          {result.seasons?.length > 0 ? (
            <>
              <DataName>Seasons</DataName>
              <Section>
                {result.seasons.map((season) => (
                  <MinPoster
                    imageUrl={season.poster_path}
                    title={season.name}
                  ></MinPoster>
                ))}
              </Section>
            </>
          ) : null}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
