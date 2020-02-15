# Description

This web app is a simple site where visitors are able to see a list of 'wishes' to be fulfilled on the landing page. Each 'wish' has a specific animal and a toy attributed to it. Each donation funds the wish. When the wish is fully funded, the toy will be sent to the animal and a new wish will be selected to then be displayed on the landing page.

Donors will be emailed when the animal receives the toy. The receiving zookeeper will be prompted to upload a picture of the animal with the new toy. This picture will be displayed in the thank you email to every donor who helped fund that wish.

This is the first draft concept for the front end. Creating new 'active' wishes will be handled by the backend automatically when a wish is fully funded.

# Clone repository 

The backend directory is a submodule. Run `git clone --recursive https://github.com/bigcatplichta/wildwish-js-concept` to ensure everything is cloned correctly.

# Backend resources and starting the server

This uses resources provided by the Rails 'wildwish-app', located here: https://github.com/bigcatplichta/wildwish-app/tree/js-concept-backend. Make sure you grab the 'js-concept-backend' branch.

The repo can be downloaded in the the backend directory here, or in it's own separate repo, as long as the server is running. Follow the README in that repository to get the server spun up. 

Run `rails server` in the backend directory to start the server (or in the root directory of the backend if downloaded as separate repo). Resources can be accessed as an API using RESTful routes ('/animals', '/wishes/active', etc). Current routes that are accessed by this frontend are 'GET /wishes/active', 'POST /donations', 'POST /wishes/:id/reset_donations', and 'GET /wishes/reset_active_wishes'.

# Viewing the frontend

While in the 'frontend' directory, run `open index.html` in the terminal. 

# Ignore (or constructively critique) the mess 

This was the first time I built something in JavaScript. Most of it was built while learning how to build it at the same time. Some methods were written a certain way because it was working, though looking back at it I would have wanted to build those methods differently (looking at you, 'function createActiveWishCard()'). The code is preserved in its original disorganized state, as it reflects how my brain built it using "system thinking".

I welcome suggestions on improvement, as this concept is being developed into a working web application.

# Authors

Matt Plichta https://github.com/bigcatplichta

# License

Copyright 2019 Matt Plichta

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.