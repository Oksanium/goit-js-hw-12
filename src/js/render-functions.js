'use strict';

export function render(picsArr) {
  return picsArr.map(makePic).join('');

  function makePic(picObj) {
    return `<li class="card">
                <a href="${picObj.largeImageURL}">
                <div class="img-wrapper">
                <img src="${picObj.webformatURL}" alt="${picObj.tags}">
                </div>
                </a>
            <table>
                <tr>
                    <th>Likes</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Downloads</th>
                </tr>
                <tr>
                    <td>"${picObj.likes}"</td>
                    <td>"${picObj.views}"</td>
                    <td>"${picObj.comments}"</td>
                    <td>"${picObj.downloads}"</td>
                </tr>
            </table>
        </li>`;
  }
}
