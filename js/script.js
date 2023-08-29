$(document).ready(function() {
    let page = 0;
    let isScrolling = false;
    let sectionName = '#home';

    const limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    const vh = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
    );

    const totalPages = Math.round(limit / vh) - 1;
    const navCircles = document.querySelectorAll('.nav-circle');

    function scrollToPage(pageNumber) {
        if (pageNumber < 0) {
            pageNumber = 0;
        } else if (pageNumber > totalPages) {
            pageNumber = totalPages;
        }

        $('html, body').animate(
            {
                scrollTop: vh * pageNumber,
            },
            {
                complete: function () {
                    isScrolling = false;
                },
            }
        );
    }

    function initializePagination() {
        const paginationNumbers = document.getElementById("pagination-numbers");
        const paginatedList = document.getElementById("paginated-list");
        const listItems = paginatedList.querySelectorAll("li");
        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");
    
        const paginationLimit = 2;
        const pageCount = Math.ceil(listItems.length / paginationLimit);
        let currentPage = 1;
    
        const disableButton = (button) => {
            button.classList.add("disabled");
            button.setAttribute("disabled", true);
        };
    
        const enableButton = (button) => {
            button.classList.remove("disabled");
            button.removeAttribute("disabled");
        };
    
        const handlePageButtonsStatus = () => {
            if (currentPage === 1) {
                disableButton(prevButton);
            } else {
                enableButton(prevButton);
            }
    
            if (pageCount === currentPage) {
                disableButton(nextButton);
            } else {
                enableButton(nextButton);
            }
        };
    
        const handleActivePageNumber = () => {
            document.querySelectorAll(".pagination-numbers").forEach((button) => {
                button.classList.remove("active");
                const pageIndex = Number(button.getAttribute("page-index"));
                if (pageIndex == currentPage) {
                    button.classList.add("active");
                }
            });
        };
    
        const appendPageNumber = (index) => {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-numbers";
            pageNumber.innerHTML = index;
            pageNumber.setAttribute("page-index", index);
            pageNumber.setAttribute("aria-label", "Page " + index);
    
            paginationNumbers.appendChild(pageNumber);
        };
    
        const getPaginationNumbers = () => {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        };
    
        const setCurrentPage = (pageNum) => {
            currentPage = pageNum;
    
            handleActivePageNumber();
            handlePageButtonsStatus();
    
            const prevRange = (pageNum - 1) * paginationLimit;
            const currRange = pageNum * paginationLimit;
    
            listItems.forEach((item, index) => {
                item.classList.add("hidden");
                if (index >= prevRange && index < currRange) {
                    item.classList.remove("hidden");
                }
            });
        };
    
        getPaginationNumbers();
        setCurrentPage(1);
    
        prevButton.addEventListener("click", () => {
            setCurrentPage(currentPage - 1);
        });
    
        nextButton.addEventListener("click", () => {
            setCurrentPage(currentPage + 1);
        });
    
        document.querySelectorAll(".pagination-numbers").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
    
            if (pageIndex) {
                button.addEventListener("click", () => {
                    setCurrentPage(pageIndex);
                });
            }
        });
    }

    window.addEventListener('wheel', function (event) {
        if (!isScrolling) {
            isScrolling = true;

            const scrollDirection = event.deltaY < 0 ? -1 : 1;
            page += scrollDirection;

            if (page < 0) {
                page = 0;
            } else if (page > totalPages) {
                page = totalPages;
            }

            navCircles.forEach((circle, index) => {
                if (index === page) {
                    circle.classList.add('active');
                } else {
                    circle.classList.remove('active');
                }
            });

            sectionName = navCircles[page].querySelector("a").getAttribute("href");
            history.replaceState(null, null, `${sectionName}`);

            scrollToPage(page);
        }
    });

    navCircles.forEach((circle, index) => {
        circle.addEventListener('click', event => {
            scrollToPage(index + 1);
    
            navCircles.forEach((circle, i) => {
                if (i === index) {
                    circle.classList.add('active'); 
                } else {
                    circle.classList.remove('active');
                }
            });
        });
    });

    window.addEventListener("load", initializePagination);
});