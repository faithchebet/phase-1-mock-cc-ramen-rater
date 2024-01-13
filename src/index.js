// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');
    const editRamenForm = document.getElementById('edit-ramen');
  
    
    const fetchRamenData = async () => {
      try {
        const response = await axios.get(`${baseURL}/ramens`);
        const ramens = response.data;
  
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
  
          img.addEventListener('click', () => displayRamenDetails(ramen));
  
          ramenMenu.appendChild(img);
        });
  
        
        if (ramens.length > 0) {
          displayRamenDetails(ramens[0]);
        }
      } catch (error) {
        console.error('Error fetching ramen data:', error);
      }
    };
  
    
    const displayRamenDetails = (ramen) => {
      ramenDetail.querySelector('.detail-image').src = ramen.image;
      ramenDetail.querySelector('.name').textContent = ramen.name;
      ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    };
  
    
    newRamenForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;
  
      try {
        const response = await axios.post(`${baseURL}/ramens`, {
          name,
          restaurant,
          image,
          rating,
          comment,
        });
  
        const newRamen = response.data;
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
  
        img.addEventListener('click', () => displayRamenDetails(newRamen));
  
        ramenMenu.appendChild(img);
  
        
        newRamenForm.reset();
      } catch (error) {
        console.error('Error creating new ramen:', error);
      }
    });
  
    
    editRamenForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const newRating = document.getElementById('new-rating').value;
      const newComment = document.getElementById('new-comment').value;
  
      
      ratingDisplay.textContent = newRating;
      commentDisplay.textContent = newComment;
  
      
      editRamenForm.reset();
    });
  
    
    fetchRamenData();
  });
  