class CreateHashdocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :hashdocuments do |t|
      t.string :path

      t.timestamps
    end
  end
end
