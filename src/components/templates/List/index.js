import React from "react";
/* Import a design component that likely defines the overall structure of the page */
import MainLayout from 'components/organisms/MainLayout';
/* Import a component that handles infinite scrolling, allowing more items to load as the user scrolls down */
import InfiniteScroll from 'components/molecules/InfiniteScroll';

import "./styles.scss";

/* React component that is used to display a list of items with support for infinite scrolling */
const List = ({ elements, title, hasMore, fetchMoreData, showLinks, additionalContent }) => {
    /* Wrap the component's content in a general layout defined by MainLayout */
    return <MainLayout>
        <div className="community-list-header">
            <h1>{title}</h1>
        </div>
        {/* If additionalContent is provided, it is displayed in an additional <div> */}
        {additionalContent && <div className="additional-content">{additionalContent}</div>}
        {/* If items are passed to the list, the InfiniteScroll component is rendered, which is responsible for displaying the items and loading more data if hasMore is true */}
        {elements && <InfiniteScroll elements={elements} hasMore={hasMore} fetchMoreData={fetchMoreData} showLinks={showLinks} />}
    </MainLayout>
}

export default List;





