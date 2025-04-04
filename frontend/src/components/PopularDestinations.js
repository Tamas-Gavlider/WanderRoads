import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Card, Button } from "react-bootstrap";
import styles from "../styles/PopularDestinations.module.css";
import Loading from "./Loading";

// Displays the top 6 countries based on the number of posts shared by users
const PopularDestinations = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);

  useEffect(() => {
    // Fetch post counts by country and sort them to get the most popular destinations
    const fetchPostCounts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        const postCounts = data.country_post_counts || {};
        // Convert the country-post mapping to an array and sort by post count
        const sortedDestinations = Object.entries(postCounts)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6); // Get top 6 destinations

        setPopularDestinations(sortedDestinations);
      } catch (err) {
        console.error("Error fetching post counts:", err);
      }
    };

    fetchPostCounts();
  }, []);
  // Show loading spinner while data is being fetched
  if (!popularDestinations.length) {
    return <Loading />;
  }

  return (
    <div className={`container my-4 ${styles.Container}`}>
      <h3 className={`text-center text-danger mb-4 ${styles.Header}`}>
        Top Countries on WanderRoads
      </h3>
      <Accordion>
        {popularDestinations.map((dest, index) => {
          // Generates the accordion title based on rank
          const title =
            index === 0
              ? "Check the most popular"
              : index === 1
              ? "Check the second most popular"
              : index === 2
              ? `Check the third most popular`
              : `Check the ${index + 1}th most popular`;

          return (
            <Card key={index} className={styles.Card}>
              <Card.Header className={styles.Accordion}>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={String(index)}
                  className={styles.Title}
                >
                  {title} country
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={String(index)}>
                <Card.Body className={styles.CardBody}>
                  {dest.count} {dest.count > 1 ? "posts" : "post"} from{" "}
                  {dest.country}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PopularDestinations;
