Documents: 
    - GET /documents 
    - POST /documents, 
    - GET /documents/{id}
    - PUT /documents/{id}
    - DELETE /documents/{id},
    - PUT /documents/{id}/recover,
    - DELETE /documents/{id}/purge, 
    - POST /documents/{id}/clone, 
    - POST /v2/documents/{id}/clone
Versions:
    - GET /documents/{id}/versions, 
    - GET /documents/{id}/versions/{vid}, 
    - DELETE /documents/{id}/versions/{vid}, 
    - PUT /documents/{id}/versions/{vid}/release
Version content: 
    - GET /documents/{id}/versions/{vid}/params, 
    - PUT /documents/{id}/versions/{vid}/params, 
    - GET /documents/{id}/versions/{vid}/form, 
    - GET /documents/{id}/versions/{vid}/file, 
    - POST /documents/{id}/versions/{vid}/file, 
    - GET /documents/{id}/versions/{vid}/export
Comments: 
    - GET /documents/{id}/comments
    - POST /documents/{id}/comments
Subscribers: 
    - GET /documents/{id}/subscribers
    - POST /documents/{id}/subscribers
    - DELETE /documents/{id}/subscribers
Permissions: 
    - GET /documents/{id}/permissions,
    - POST /documents/{id}/permissions, 
    - PUT /documents/{id}/permissions/{pid}
    - DELETE /documents/{id}/permissions/{pid}