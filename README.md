# Arabook REST API Documentation

## Parameter Descriptions

| Parameter  | Type   |  Description    |
|:---------- |:------ |:--------------- | 
| name       | String | Poster name     |
| title      | String | Post title      | 
| link       | String | Link (optional) | 
| text       | String | Content text    | 
| image      | String | Image URL       | 
| tags       | Array  | String array of tags | 
| date       | String | Timestamp in ISODate format | 
| comments   | Array  | Array containing comments | 


## Posts



### Requests

#### Get Post
**GET** - ``/api/posts?{parameters}`` <_Find posts_>  


| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| name        | String | Poster name     | No       |
| title       | String | Post title      | No       |
| text        | String | Content text    | No       |


**GET** - ``/api/posts/{_id}`` <_Find post with specific ID_>

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | ObjectId String | Yes      |

Success response:

    Code: 200
    Content: {
        'name': 'User',
        'title': 'Lorem Ipsum',
        'date': '2000-01-01T00:00:00Z', 
         'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
         'link': 'https://www.lipsum.com/',
         'image' 'https://picsum.photos/200',
         'tags': [ 'tag1', 'tag2', 'tag3' ],
         'comments': [
            {
                'name': 'commenter',
                'name': 'Lorem Ipsum is simply dummy text of the printing',
                'date': '2000-01-01T00:00:00Z'
            }
         ]   
    }
    
Error responses:
````
Code: 400
Content: {'message': 'Given ID is not proper ObjectId String'}
````

````
Code: 404
Content: {'message': 'No posts found'}
````

#### Delete Post

**DELETE** - ``/api/posts/{_id}`` <_Delete post with specific ID_>

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | ObjectId String | Yes      |

Success response:

    Code: 200
    Content: {
         'name': 'User',
         'title': 'Lorem Ipsum',
         'date': '2000-01-01T00:00:00Z', 
         'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
         'link': 'https://www.lipsum.com/',
         'image' 'https://picsum.photos/200',
         'tags': [ 'tag1', 'tag2', 'tag3' ],
         'comments': [
            {
                'name': 'commenter',
                'name': 'Lorem Ipsum is simply dummy text of the printing',
                'date': '2000-01-01T00:00:00Z'
            }
         ]   
    }

Error responses:
````
Code: 400
Content: {'message': 'Given ID is not proper ObjectId String'}
````

````
Code: 404
Content: {'message': 'No posts found'}
````

#### Create New Post

**POST** - ``/api/posts`` 

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | ObjectId String | Yes      |

Example data params :

    {
        'name': 'User',
        'title': 'Lorem Ipsum',
        'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        'link': 'https://www.lipsum.com/',
        'image' 'https://picsum.photos/200',
        'tags': [ 'tag1', 'tag2', 'tag3' ],   
    }


Success response:

    Code: 201
    Content: {'message': 'A new post was succesfully created.'}
   
Error responses:
````
Code: 400
Content: {'message': 'Invalid data'}
````

````
Code: 404
Content: {'message': 'No posts found'}
````
    
#### Update Post

**PATCH** - ``/api/posts/{_id}`` <_Update post with specific ID_>

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | ObjectId String | Yes      |

Example data params : ``see POST data params``

Success response:

    Code: 200
    Content: {'message': 'The post was succesfully updated.'}

Error responses:
````
Code: 400
Content: {'message': 'Invalid data'}
````

````
Code: 404
Content: {'message': 'No posts found'}
````
    
## Comments

#### GET comments

**GET** - ``/api/posts/{_id}/comments`` <_Get only comments from specific post_>

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | Post ObjectId   | Yes      |

Error responses:
````
Code: 400
Content: {'message': 'Invalid data'}
````

````
Code: 400
Content: {'message': 'Invalid ObjectId format'}
````

````
Code: 500
Content: {'message': 'Failed' , 'error': 'error message}
````

#### Create new comment

**POST** - ``/api/posts/{_id}/comments`` <_Creates new comment into specific post_>

| URL Params  | Type   |  Description    | Required |
|:----------- |:------ |:--------------- |:-------- |
| id          | String | Post ObjectId   | Yes      |

Example data params :

    {
        'name': 'Anonymous',
        'comment': 'Posting a new comment into post'
    }

Success response:

    Code: 201
    Content: {'message': 'Comment created successfully'}

Error responses:
````
Code: 400
Content: {'error': 'error message'}
````

#### Search

**GET** - ``/api/search?{parameters}`` <_Search posts with specific parameters_>


| URL Params  | Type   |  Description    |
|:----------- |:------ |:--------------- |
| title       | String | Post title      | 
| tag         | String | Attached tags   | 

Example: ``/api/search?title=Lorem&tag=usefull``
