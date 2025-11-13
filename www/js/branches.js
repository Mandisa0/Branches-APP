function getBranches() {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://phantomstudio.co.za/branches/get/branches",
        success: function (response) {

            var branches = '';
            var branchData;

            for (let i = 0; i < response.branches.length; i++) {

                var branchId = 1;
                branchTitle = response.branches[i].title;
                branchFile = response.branches[i].file;

                try{
                if (localStorage.getItem(branchTitle) != null) {
                    branchData = JSON.parse(localStorage.getItem(branchTitle));
                    branchId = branchData.branchId;
                    branchFile = branchData.branchFile;
                }
                }catch(Error){
                    console.log(Error)
                }

                branches += '<div class="branch-container">';
                branches += '<div class="image">';
                branches += '<img class="branchImage" />';
                branches += '</div>';
                branches += '<table class="branch-table">';
                branches += '<tr>';
                branches += '<td style="width: 70%; text-align: left;">' + branchTitle + '</td>';
                branches += '<td onclick="setCurentBranch(\'' + branchTitle + '\',\'' + branchFile + '\');loadpage(\'main-content\', \'html/branch.html\'),initialiseBranch(self, '+branchId+')"';
                branches += 'style="width: 30%; text-align: right;margin-right: 50px;"><i class="fa fa-play-circle" aria-hidden="true"></i></td>';
                branches += '</tr>';
                branches += '</table>';
                branches += '</div>';
            }

            $("#branches").html(branches);

        }
    });

}
